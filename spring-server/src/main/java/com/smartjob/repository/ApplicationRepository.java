package com.smartjob.repository;
import com.smartjob.entity.Application;
import com.smartjob.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidateId(Long candidateId);
    Optional<Application> findByCandidateIdAndJobId(Long candidateId, Long jobId);
    long countByStatus(ApplicationStatus status);
}