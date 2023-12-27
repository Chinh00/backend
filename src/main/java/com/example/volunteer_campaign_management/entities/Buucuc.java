package com.example.volunteer_campaign_management.entities;

import javax.persistence.*;

@Entity
@Table(name = "buucuc")
public class Buucuc {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "diachi")
    private String diachi;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "log")
    private Double log;

    @Column(name = "ten")
    private String ten;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDiachi() {
        return this.diachi;
    }

    public void setDiachi(String diachi) {
        this.diachi = diachi;
    }

    public Double getLat() {
        return this.lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLog() {
        return this.log;
    }

    public void setLog(Double log) {
        this.log = log;
    }

    public String getTen() {
        return this.ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }
}
