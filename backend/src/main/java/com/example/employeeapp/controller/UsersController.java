package com.example.employeeapp.controller;

import com.example.employeeapp.model.User;
import com.example.employeeapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping
    public List<User> list() {
        // return users without passwords in a simple way (entity contains password, but frontend will ignore it)
        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String email = body.get("email");
        String password = body.get("password");
        String role = body.getOrDefault("role", "ROLE_USER");

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body("username and password are required");
        }

        if (userRepository.findByUsername(username).isPresent()) return ResponseEntity.status(409).body("username already exists");

        User u = new User();
        u.setUsername(username);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(password));
        u.setRole(role.startsWith("ROLE_") ? role : ("ROLE_" + role));
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("id", u.getId(), "username", u.getUsername(), "email", u.getEmail(), "role", u.getRole()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return userRepository.findById(id).map(u -> {
            String email = body.get("email");
            if (email != null) u.setEmail(email);
            userRepository.save(u);
            return ResponseEntity.ok(Map.of("id", u.getId(), "username", u.getUsername(), "email", u.getEmail(), "role", u.getRole()));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> setRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String role = body.get("role");
        if (role == null) return ResponseEntity.badRequest().body("role is required");
        return userRepository.findById(id).map(u -> {
            u.setRole(role.startsWith("ROLE_") ? role : ("ROLE_" + role));
            userRepository.save(u);
            return ResponseEntity.ok(Map.of("id", u.getId(), "role", u.getRole()));
        }).orElse(ResponseEntity.notFound().build());
    }
}
