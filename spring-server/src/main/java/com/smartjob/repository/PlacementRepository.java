package com.smartjob.repository;
import com.smartjob.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PlacementRepository extends JpaRepository<Placement, Long> {
    List<Placement> findByCandidateId(Long candidateId);
    Optional<Placement> findByCandidateIdAndJobId(Long candidateId, Long jobId);
}