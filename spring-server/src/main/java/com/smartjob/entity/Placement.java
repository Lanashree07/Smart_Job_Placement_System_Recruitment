package com.smartjob.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "placements")
public class Placement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id")
    private Job job;
    
    private String company;
    private String role;
    private String packageAmount;
    private LocalDateTime placementDate = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    private PlacementStatus status;
}