package com.example.volunteer_campaign_management.controllers;


import com.example.volunteer_campaign_management.entities.Buucuc;
import com.example.volunteer_campaign_management.repositories.BuuCucRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/buucuc")
@CrossOrigin(origins = "http://localhost:3000")
public class BuuCucController {

    @Autowired
    BuuCucRepo buuCucService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<List<Buucuc>> list() {
        return new ResponseEntity<List<Buucuc>>(buuCucService.findAll(), HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Buucuc buucucEntity) {
        buuCucService.save(buucucEntity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Buucuc buucucEntity) {
        Optional<Buucuc> buucuc = buuCucService.findById(buucucEntity.getId());
        buucuc.get().setTen(buucucEntity.getTen());
        buucuc.get().setDiachi(buucucEntity.getDiachi());
        buucuc.get().setLat(buucucEntity.getLat());
        buucuc.get().setLog(buucucEntity.getLog());
        buuCucService.save(buucuc.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
