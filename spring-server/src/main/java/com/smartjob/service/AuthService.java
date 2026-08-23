package com.smartjob.service;

import com.smartjob.dto.*;
import com.smartjob.entity.*;
import com.smartjob.repository.CandidateRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private CandidateRepository repo;
    
    public AuthResponse login(LoginDto dto) {
        Candidate c = repo.findByEmail(dto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        if (!BCrypt.checkpw(dto.getPassword(), c.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return new AuthResponse("mock-jwt-" + c.getId(), CandidateDto.fromEntity(c));
    }
    
    public CandidateDto register(Candidate c) {
        if (repo.findByEmail(c.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        c.setRole(Role.CANDIDATE);
        c.setPassword(BCrypt.hashpw(c.getPassword(), BCrypt.gensalt()));
        return CandidateDto.fromEntity(repo.save(c));
    }

    public CandidateDto registerAdmin(Candidate c) {
        if (repo.findByEmail(c.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        c.setRole(Role.ADMIN);
        c.setPassword(BCrypt.hashpw(c.getPassword(), BCrypt.gensalt()));
        return CandidateDto.fromEntity(repo.save(c));
    }
}