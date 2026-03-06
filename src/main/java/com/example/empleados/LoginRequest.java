package com.example.empleados;

public class LoginRequest {
    private String clave;
    private String password;

    public LoginRequest() {}

    public LoginRequest(String clave, String password) {
        this.clave = clave;
        this.password = password;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}