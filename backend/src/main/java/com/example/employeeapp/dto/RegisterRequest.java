package com.example.employeeapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User registration request")
public class RegisterRequest {
    
    @Schema(description = "Username", example = "newuser", required = true)
    private String username;
    
    @Schema(description = "Password", example = "password123", required = true)
    private String password;
    
    @Schema(description = "User role", example = "ROLE_USER", defaultValue = "ROLE_USER")
    private String role;

    // Constructors
    public RegisterRequest() {}

    public RegisterRequest(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
