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
            // Seeding has been removed as per Requirements to start with an empty database.
        };
    }
}