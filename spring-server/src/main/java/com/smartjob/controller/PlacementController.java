package com.smartjob.controller;
import com.smartjob.entity.*;
import com.smartjob.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {
    @Autowired private PlacementRepository repo;
    
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<?> getByCandidate(@PathVariable Long candidateId) {
        return ResponseEntity.ok(repo.findByCandidateId(candidateId));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return repo.findById(id).map(p -> {
            p.setStatus(PlacementStatus.valueOf(payload.get("status")));
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }
}