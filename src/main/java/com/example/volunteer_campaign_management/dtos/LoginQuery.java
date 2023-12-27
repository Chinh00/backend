package com.example.volunteer_campaign_management.dtos;

public class LoginQuery {
    private String sdt;
    private String password;

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
