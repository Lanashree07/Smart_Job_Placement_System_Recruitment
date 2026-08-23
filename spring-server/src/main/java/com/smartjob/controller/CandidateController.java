package com.smartjob.controller;
import com.smartjob.dto.CandidateDto;
import com.smartjob.entity.Candidate;
import com.smartjob.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {
    @Autowired private CandidateRepository repo;
    
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(repo.findAll().stream().map(CandidateDto::fromEntity).collect(Collectors.toList()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return repo.findById(id).map(c -> ResponseEntity.ok(CandidateDto.fromEntity(c)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Candidate updated) {
        return repo.findById(id).map(c -> {
            c.setFullName(updated.getFullName());
            c.setPhone(updated.getPhone());
            c.setDateOfBirth(updated.getDateOfBirth());
            c.setGender(updated.getGender());
            c.setAddress(updated.getAddress());
            c.setCity(updated.getCity());
            c.setState(updated.getState());
            c.setCollege(updated.getCollege());
            c.setDegree(updated.getDegree());
            c.setBranch(updated.getBranch());
            c.setGraduationYear(updated.getGraduationYear());
            c.setCgpa(updated.getCgpa());
            c.setSkills(updated.getSkills());
            return ResponseEntity.ok(CandidateDto.fromEntity(repo.save(c)));
        }).orElse(ResponseEntity.notFound().build());
    }
}