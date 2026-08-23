package com.smartjob.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "candidates")
public class Candidate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String fullName;
    @Column(unique = true)
    private String email;
    private String phone;
    private String dateOfBirth;
    private String gender;
    private String address;
    private String city;
    private String state;
    private String college;
    private String degree;
    private String branch;
    private Integer graduationYear;
    private Double cgpa;
    private String skills;
    private String resume;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
    private LocalDateTime createdAt = LocalDateTime.now();
}