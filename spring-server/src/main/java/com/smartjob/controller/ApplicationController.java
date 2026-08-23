package com.smartjob.controller;
import com.smartjob.entity.*;
import com.smartjob.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired private ApplicationRepository appRepo;
    @Autowired private CandidateRepository candRepo;
    @Autowired private JobRepository jobRepo;
    @Autowired private PlacementRepository placeRepo;
    
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(appRepo.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return appRepo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<?> getByCandidate(@PathVariable Long candidateId) {
        return ResponseEntity.ok(appRepo.findByCandidateId(candidateId));
    }
    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Long> payload) {
        Long cId = payload.get("candidateId");
        Long jId = payload.get("jobId");
        if (appRepo.findByCandidateIdAndJobId(cId, jId).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("message", "Already applied"));
        }
        Candidate c = candRepo.findById(cId).orElse(null);
        Job j = jobRepo.findById(jId).orElse(null);
        if (c == null || j == null) return ResponseEntity.badRequest().body(Map.of("message", "Invalid candidate or job"));
        
        Application app = new Application();
        app.setCandidate(c);
        app.setJob(j);
        app.setStatus(ApplicationStatus.APPLIED);
        return ResponseEntity.ok(appRepo.save(app));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return appRepo.findById(id).map(app -> {
            ApplicationStatus newStatus = ApplicationStatus.valueOf(payload.get("status"));
            app.setStatus(newStatus);
            appRepo.save(app);
            
            // Auto create placement if selected
            if (newStatus == ApplicationStatus.SELECTED && placeRepo.findByCandidateIdAndJobId(app.getCandidate().getId(), app.getJob().getId()).isEmpty()) {
                Placement p = new Placement();
                p.setCandidate(app.getCandidate());
                p.setJob(app.getJob());
                p.setCompany(app.getJob().getCompany());
                p.setRole(app.getJob().getTitle());
                p.setPackageAmount(app.getJob().getSalary());
                p.setStatus(PlacementStatus.SELECTED);
                placeRepo.save(p);
            }
            return ResponseEntity.ok(app);
        }).orElse(ResponseEntity.notFound().build());
    }
}