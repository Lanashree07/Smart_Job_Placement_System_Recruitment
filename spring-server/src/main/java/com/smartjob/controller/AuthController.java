package com.smartjob.controller;
import com.smartjob.dto.*;
import com.smartjob.entity.Candidate;
import com.smartjob.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private AuthService service;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        try {
            return ResponseEntity.ok(service.login(dto));
        } catch(Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Candidate c) {
        try {
            return ResponseEntity.ok(service.register(c));
        } catch(Exception e) {
            return ResponseEntity.status(409).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Candidate c) {
        try {
            return ResponseEntity.ok(service.registerAdmin(c));
        } catch(Exception e) {
            return ResponseEntity.status(409).body(Map.of("message", e.getMessage()));
        }
    }
}