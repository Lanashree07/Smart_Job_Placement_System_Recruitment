package com.smartjob.controller;
import com.smartjob.entity.Job;
import com.smartjob.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired private JobRepository repo;
    
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Job job) {
        return ResponseEntity.ok(repo.save(job));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Job updated) {
        return repo.findById(id).map(j -> {
            j.setCompany(updated.getCompany());
            j.setTitle(updated.getTitle());
            j.setLocation(updated.getLocation());
            j.setJobType(updated.getJobType());
            j.setSalary(updated.getSalary());
            j.setDescription(updated.getDescription());
            j.setResponsibilities(updated.getResponsibilities());
            j.setRequiredSkills(updated.getRequiredSkills());
            j.setEligibility(updated.getEligibility());
            j.setDeadline(updated.getDeadline());
            return ResponseEntity.ok(repo.save(j));
        }).orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return repo.findById(id).map(j -> {
            repo.delete(j);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}