package com.example.volunteer_campaign_management.repositories;

import com.example.volunteer_campaign_management.entities.BuuTa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuuTaRepo extends JpaRepository<BuuTa, Integer> {
    public BuuTa findBuuTaBySodienthoai(String sdt);
}
