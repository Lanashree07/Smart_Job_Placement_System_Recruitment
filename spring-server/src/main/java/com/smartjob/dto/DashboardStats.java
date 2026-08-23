package com.smartjob.dto;
import lombok.Data;
@Data
public class DashboardStats {
    private long totalCandidates;
    private long totalJobs;
    private long totalApplications;
    private long underReview;
    private long shortlisted;
    private long selected;
    private long rejected;
    private long totalPlacements;
}