package com.smartjob.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "jobs")
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String company;
    private String title;
    private String location;
    private String jobType;
    private String salary;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "TEXT")
    private String responsibilities;
    @Column(columnDefinition = "TEXT")
    private String requiredSkills;
    private String eligibility;
    private String deadline;
    private LocalDateTime createdAt = LocalDateTime.now();
}