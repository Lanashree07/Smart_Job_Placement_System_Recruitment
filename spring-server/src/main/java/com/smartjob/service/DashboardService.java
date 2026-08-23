package com.smartjob.service;

import com.smartjob.dto.DashboardStats;
import com.smartjob.entity.ApplicationStatus;
import com.smartjob.entity.Role;
import com.smartjob.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private CandidateRepository candRepo;

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private ApplicationRepository appRepo;

    @Autowired
    private PlacementRepository placeRepo;

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();

        // Count only actual candidates, excluding admins
        stats.setTotalCandidates(candRepo.countByRole(Role.CANDIDATE));

        stats.setTotalJobs(jobRepo.count());
        stats.setTotalApplications(appRepo.count());

        stats.setUnderReview(
            appRepo.countByStatus(ApplicationStatus.UNDER_REVIEW)
        );

        stats.setShortlisted(
            appRepo.countByStatus(ApplicationStatus.SHORTLISTED)
        );

        stats.setSelected(
            appRepo.countByStatus(ApplicationStatus.SELECTED)
        );

        stats.setRejected(
            appRepo.countByStatus(ApplicationStatus.REJECTED)
        );

        stats.setTotalPlacements(placeRepo.count());

        return stats;
    }
}