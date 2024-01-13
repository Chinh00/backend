package com.example.volunteer_campaign_management.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "donhang")
public class DonHang {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "buucucnhanid")
    private Integer buucucnhanid;

    @Column(name = "diemgom")
    private String diemgom;

    @Column(name = "taitrong")
    private Double taitrong;

    @Column(name = "thoigiangom")
    private LocalDate thoigiangom = LocalDate.now();

    @Column(name = "trangthai")
    private String trangthai;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBuucucnhanid() {
        return this.buucucnhanid;
    }

    public void setBuucucnhanid(Integer buucucnhanid) {
        this.buucucnhanid = buucucnhanid;
    }

    public String getDiemgom() {
        return this.diemgom;
    }

    public void setDiemgom(String diemgom) {
        this.diemgom = diemgom;
    }

    public Double getTaitrong() {
        return this.taitrong;
    }

    public void setTaitrong(Double taitrong) {
        this.taitrong = taitrong;
    }

    public LocalDate getThoigiangom() {
        return this.thoigiangom;
    }

    public void setThoigiangom(LocalDate thoigiangom) {
        this.thoigiangom = thoigiangom;
    }

    public String getTrangthai() {
        return this.trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }
}
