package com.smartjob.dto;
import com.smartjob.entity.Candidate;
import com.smartjob.entity.Role;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CandidateDto {
    private Long id;
    private String fullName;
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
    private Role role;
    private LocalDateTime createdAt;
    
    public static CandidateDto fromEntity(Candidate c) {
        CandidateDto dto = new CandidateDto();
        dto.setId(c.getId());
        dto.setFullName(c.getFullName());
        dto.setEmail(c.getEmail());
        dto.setPhone(c.getPhone());
        dto.setDateOfBirth(c.getDateOfBirth());
        dto.setGender(c.getGender());
        dto.setAddress(c.getAddress());
        dto.setCity(c.getCity());
        dto.setState(c.getState());
        dto.setCollege(c.getCollege());
        dto.setDegree(c.getDegree());
        dto.setBranch(c.getBranch());
        dto.setGraduationYear(c.getGraduationYear());
        dto.setCgpa(c.getCgpa());
        dto.setSkills(c.getSkills());
        dto.setResume(c.getResume());
        dto.setRole(c.getRole());
        dto.setCreatedAt(c.getCreatedAt());
        return dto;
    }
}