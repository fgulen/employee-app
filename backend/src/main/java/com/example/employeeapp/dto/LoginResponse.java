package com.example.employeeapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Login response containing JWT authentication token")
public class LoginResponse {
    
    @Schema(description = "JWT authentication token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    // Constructors
    public LoginResponse() {}

    public LoginResponse(String token) {
        this.token = token;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
