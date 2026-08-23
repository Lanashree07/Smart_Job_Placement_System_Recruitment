package com.smartjob.config;
import com.smartjob.entity.*;
import com.smartjob.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner initDatabase(CandidateRepository candRepo, JobRepository jobRepo) {
        return args -> {
            if (candRepo.findByEmail("admin@smarthire.com").isEmpty()) {
                Candidate admin = new Candidate();
                admin.setFullName("Admin User");
                admin.setEmail("admin@smarthire.com");
                admin.setPassword("admin123");
                admin.setRole(Role.ADMIN);
                candRepo.save(admin);
            }
            if (jobRepo.count() == 0) {
                Job j1 = new Job();
                j1.setCompany("TechCorp");
                j1.setTitle("Software Engineer");
                j1.setLocation("New York");
                j1.setJobType("Full-time");
                j1.setSalary("$120,000");
                j1.setDescription("Great job");
                j1.setRequiredSkills("React, Java");
                j1.setDeadline("2026-10-01");
                jobRepo.save(j1);
                
                Job j2 = new Job();
                j2.setCompany("InnovateX");
                j2.setTitle("Frontend Developer");
                j2.setLocation("Remote");
                j2.setJobType("Contract");
                j2.setSalary("$90,000");
                j2.setDescription("Remote work");
                j2.setRequiredSkills("Vue, CSS");
                j2.setDeadline("2026-09-15");
                jobRepo.save(j2);
            }
        };
    }
}