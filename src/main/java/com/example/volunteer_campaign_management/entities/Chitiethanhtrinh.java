package com.example.volunteer_campaign_management.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "chitiethanhtrinh")
public class Chitiethanhtrinh {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "donhangid")
    private Integer donhangid;

    @Column(name = "hanhtrinhid")
    private Integer hanhtrinhid;

    @Column(name = "thoigiancapnhat")
    private LocalDate thoigiancapnhat = LocalDate.now();

    @Column(name = "trangthai")
    private String trangthai;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDonhangid() {
        return this.donhangid;
    }
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "donhangid", referencedColumnName = "id")
//    private DonHang donHang;

    public void setDonhangid(Integer donhangid) {
        this.donhangid = donhangid;
    }

    public Integer getHanhtrinhid() {
        return this.hanhtrinhid;
    }

    public void setHanhtrinhid(Integer hanhtrinhid) {
        this.hanhtrinhid = hanhtrinhid;
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



}
