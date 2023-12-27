package com.example.volunteer_campaign_management.repositories;

import com.example.volunteer_campaign_management.entities.Chitiethanhtrinh;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChitietHanhtrinhRepo extends JpaRepository<Chitiethanhtrinh, Integer> {
    public List<Chitiethanhtrinh> findAllByHanhtrinhid(Integer hanhtrinhid);
}
