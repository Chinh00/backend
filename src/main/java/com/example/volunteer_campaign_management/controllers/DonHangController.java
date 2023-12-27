package com.example.volunteer_campaign_management.controllers;

import com.example.volunteer_campaign_management.entities.BuuTa;
import com.example.volunteer_campaign_management.entities.Chitiethanhtrinh;
import com.example.volunteer_campaign_management.entities.DonHang;
import com.example.volunteer_campaign_management.entities.HanhTrinh;
import com.example.volunteer_campaign_management.repositories.BuuTaRepo;
import com.example.volunteer_campaign_management.repositories.ChitietHanhtrinhRepo;
import com.example.volunteer_campaign_management.repositories.DonHangRepo;
import com.example.volunteer_campaign_management.repositories.HanhTrinhRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/donhang")
public class DonHangController {
    @Autowired
    DonHangRepo donHangService;
    @Autowired
    HanhTrinhRepo hanhTrinhRepo;
    @Autowired
    BuuTaRepo buuTaRepo;
    @Autowired
    ChitietHanhtrinhRepo chitietHanhtrinhRepo;
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<List<DonHang>> list() {
        return new ResponseEntity<List<DonHang>>(donHangService.findAll(), HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<DonHang> create(@RequestBody DonHang donHangEntity) {
        DonHang mes = donHangService.save(donHangEntity);

        // lay ra cac buu ta chua co don hang roi tao moi
        List<Integer> list = hanhTrinhRepo.findAll().stream().map(t -> t.getBuutaid()).collect(Collectors.toList());
        List<Integer> buuTas = buuTaRepo.findAll().stream().filter(t -> list.stream().filter(c -> c == t.getId()).collect(Collectors.toList()).isEmpty()).map(t -> t.getId()).collect(Collectors.toList());
        if (!buuTas.isEmpty()) {
            HanhTrinh hanhTrinh = new HanhTrinh();
            hanhTrinh.setBuutaid(buuTaRepo.findById(buuTas.get(0)).get().getId());
            hanhTrinh.setTrangthai("Chưa hoàn thành");
            hanhTrinh.setTongquangduong(0f);

            HanhTrinh res = hanhTrinhRepo.save(hanhTrinh);

            Chitiethanhtrinh chitiethanhtrinh = new Chitiethanhtrinh();
            chitiethanhtrinh.setDonhangid(mes.getId());
            chitiethanhtrinh.setTrangthai("Chưa hoàn thành");
            chitiethanhtrinh.setHanhtrinhid(res.getId());
            chitietHanhtrinhRepo.save(chitiethanhtrinh);
            return new ResponseEntity<>(donHangEntity, HttpStatus.CREATED);
        } else {
            List<HanhTrinh> hanhTrinhs = hanhTrinhRepo.findAll().stream().sorted((o1, o2) -> o1.getTongquangduong() < o2.getTongquangduong() ? 1 : 0).collect(Collectors.toList());
            Chitiethanhtrinh chitiethanhtrinh = new Chitiethanhtrinh();
            chitiethanhtrinh.setDonhangid(mes.getId());
            chitiethanhtrinh.setTrangthai("Chưa hoàn thành");
            chitiethanhtrinh.setHanhtrinhid(hanhTrinhs.get(0).getId());
            chitietHanhtrinhRepo.save(chitiethanhtrinh);
            return new ResponseEntity<>(donHangEntity, HttpStatus.CREATED);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody DonHang donHangEntity) {
        Optional<DonHang> donHang = donHangService.findById(donHangEntity.getId());
        donHang.get().setBuucucnhanid(donHangEntity.getBuucucnhanid());
        donHang.get().setTrangthai(donHangEntity.getTrangthai());
        donHang.get().setDiemgom(donHangEntity.getDiemgom());
        donHang.get().setThoigiangom(donHangEntity.getThoigiangom());
        donHang.get().setTaitrong(donHangEntity.getTaitrong());
        donHangService.save(donHang.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
