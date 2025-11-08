package com.example.employeeapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Registration response with success message")
public class RegisterResponse {
    
    @Schema(description = "Response message", example = "User registered successfully")
    private String message;
    
    @Schema(description = "Registered username", example = "newuser")
    private String username;

    // Constructors
    public RegisterResponse() {}

    public RegisterResponse(String message, String username) {
        this.message = message;
        this.username = username;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
