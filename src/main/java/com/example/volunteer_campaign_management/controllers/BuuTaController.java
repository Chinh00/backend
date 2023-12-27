package com.example.volunteer_campaign_management.controllers;

import com.example.volunteer_campaign_management.dtos.LoginQuery;
import com.example.volunteer_campaign_management.entities.BuuTa;
import com.example.volunteer_campaign_management.repositories.BuuTaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/buuta")
public class BuuTaController {
    @Autowired
    BuuTaRepo buuTaService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<List<BuuTa>> list() {
        return new ResponseEntity<List<BuuTa>>(buuTaService.findAll(), HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody BuuTa buuTaEntity) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        buuTaService.save(buuTaEntity);
        buuTaEntity.setRole(1);
        buuTaEntity.setPassword(bCryptPasswordEncoder.encode(buuTaEntity.getSodienthoai()));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody BuuTa buuTaEntity) {
        Optional<BuuTa> buuTa = buuTaService.findById(buuTaEntity.getId());
        buuTa.get().setTen(buuTaEntity.getTen());
        buuTa.get().setSodienthoai(buuTaEntity.getSodienthoai());
        buuTa.get().setTrangthai(buuTaEntity.getTrangthai());
        buuTa.get().setTaitrongtoida(buuTaEntity.getTaitrongtoida());
        buuTa.get().setBuucucid(buuTaEntity.getBuucucid());
        buuTaService.save(buuTa.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/login")
    public ResponseEntity<BuuTa> Login(@RequestBody LoginQuery loginQuery) {
        BuuTa buuTa = buuTaService.findBuuTaBySodienthoai(loginQuery.getSdt());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (bCryptPasswordEncoder.matches(loginQuery.getPassword(), buuTa.getPassword())) {
            return new ResponseEntity<>(buuTa, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
