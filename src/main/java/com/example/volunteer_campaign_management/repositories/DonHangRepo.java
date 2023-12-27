package com.example.volunteer_campaign_management.repositories;

import com.example.volunteer_campaign_management.entities.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepo extends JpaRepository<DonHang, Integer> {
}
