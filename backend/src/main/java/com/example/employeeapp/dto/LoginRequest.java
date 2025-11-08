package com.example.employeeapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Login request with username and password")
public class LoginRequest {
    
    @Schema(description = "Username", example = "admin", required = true)
    private String username;
    
    @Schema(description = "Password", example = "admin", required = true)
    private String password;

    // Constructors
    public LoginRequest() {}

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
