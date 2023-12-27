package com.example.volunteer_campaign_management.controllers;

import com.example.volunteer_campaign_management.entities.Buucuc;
import com.example.volunteer_campaign_management.entities.Chitiethanhtrinh;
import com.example.volunteer_campaign_management.entities.DonHang;
import com.example.volunteer_campaign_management.entities.HanhTrinh;
import com.example.volunteer_campaign_management.repositories.BuuCucRepo;
import com.example.volunteer_campaign_management.repositories.ChitietHanhtrinhRepo;
import com.example.volunteer_campaign_management.repositories.DonHangRepo;
import com.example.volunteer_campaign_management.repositories.HanhTrinhRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hanhtrinh")
public class HanhTrinhController {
    @Autowired
    HanhTrinhRepo hanhTrinhRepo;
    @Autowired
    ChitietHanhtrinhRepo chitietHanhtrinhRepo;
    @Autowired
    DonHangRepo donHangRepo;
    @Autowired
    BuuCucRepo buuCucRepo;
    @GetMapping("/list")
    public ResponseEntity<List<HanhTrinh>> list() {
        return new ResponseEntity<>(hanhTrinhRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Buucuc>> get(@PathVariable Integer id) {
        List<Chitiethanhtrinh> list = chitietHanhtrinhRepo.findAllByHanhtrinhid(id);
        ArrayList<DonHang> donHangs = new ArrayList<>();
        list.forEach(t -> {
            donHangs.add(donHangRepo.findById(t.getDonhangid()).get());
        });
        ArrayList<Buucuc> buucucs = new ArrayList<>();
        donHangs.forEach(t -> {
            buucucs.add(buuCucRepo.findById(t.getBuucucnhanid()).get());
        });
        return new ResponseEntity<>(buucucs, HttpStatus.OK);
    }

}
