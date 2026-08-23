package com.smartjob.service;
import com.smartjob.dto.*;
import com.smartjob.entity.*;
import com.smartjob.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private CandidateRepository repo;
    
    public AuthResponse login(LoginDto dto) {
        Candidate c = repo.findByEmail(dto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        if (!c.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return new AuthResponse("mock-jwt-" + c.getId(), CandidateDto.fromEntity(c));
    }
    
    public CandidateDto register(Candidate c) {
        if (repo.findByEmail(c.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        c.setRole(Role.CANDIDATE);
        return CandidateDto.fromEntity(repo.save(c));
    }
}