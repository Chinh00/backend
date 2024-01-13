package com.example.volunteer_campaign_management.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "hanhtrinh")
public class HanhTrinh {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "buutaid")
    private Integer buutaid;

    @Column(name = "thoigiancapnhat")
    private LocalDate thoigiancapnhat = LocalDate.now();

    @Column(name = "trangthai")
    private String trangthai;

    @Column(name = "tongquangduong")
    private Float tongquangduong;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBuutaid() {
        return this.buutaid;
    }

    public void setBuutaid(Integer buutaid) {
        this.buutaid = buutaid;
    }

    public LocalDate getThoigiancapnhat() {
        return this.thoigiancapnhat;
    }

    public void setThoigiancapnhat(LocalDate thoigiancapnhat) {
        this.thoigiancapnhat = thoigiancapnhat;
    }

    public String getTrangthai() {
        return this.trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }

    public Float getTongquangduong() {
        return this.tongquangduong;
    }

    public void setTongquangduong(Float tongquangduong) {
        this.tongquangduong = tongquangduong;
    }
}
