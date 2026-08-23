package com.smartjob.repository;

import com.smartjob.entity.Candidate;
import com.smartjob.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    Optional<Candidate> findByEmail(String email);

    long countByRole(Role role);
}