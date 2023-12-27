package com.example.volunteer_campaign_management.entities;

import javax.persistence.*;

@Entity
@Table(name = "buu_ta")
public class BuuTa {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "buucucid")
    private Integer buucucid;

    @Column(name = "sodienthoai")
    private String sodienthoai;

    @Column(name = "taitrongtoida")
    private Double taitrongtoida;

    @Column(name = "ten")
    private String ten;

    @Column(name = "trangthai")
    private String trangthai;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private Integer role;

    @Column(name = "image")
    private String image;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBuucucid() {
        return this.buucucid;
    }

    public void setBuucucid(Integer buucucid) {
        this.buucucid = buucucid;
    }

    public String getSodienthoai() {
        return this.sodienthoai;
    }

    public void setSodienthoai(String sodienthoai) {
        this.sodienthoai = sodienthoai;
    }

    public Double getTaitrongtoida() {
        return this.taitrongtoida;
    }

    public void setTaitrongtoida(Double taitrongtoida) {
        this.taitrongtoida = taitrongtoida;
    }

    public String getTen() {
        return this.ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getTrangthai() {
        return this.trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRole() {
        return this.role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
