package com.example.pafbackend.services;

import com.example.pafbackend.dtos.PlanDTO;
import com.example.pafbackend.dtos.PlanResponseDTO;
import com.example.pafbackend.models.*;
import com.example.pafbackend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final AppUserRepository appUserRepository;

    @Autowired
    public PlanService(PlanRepository planRepository,
                       AppUserRepository appUserRepository) {
        this.planRepository = planRepository;
        this.appUserRepository = appUserRepository;
    }

    public List<PlanResponseDTO> getAllPlans() {
        return planRepository.findByDeleteStatusFalse().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PlanResponseDTO> getPlansByUser(String userId) {
        return planRepository.findByCreatedByIdAndDeleteStatusFalse(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<PlanResponseDTO> getPlanById(String id) {
        return planRepository.findByIdAndDeleteStatusFalse(id)
                .map(this::convertToDTO);
    }

    public PlanResponseDTO createPlan(PlanDTO planDTO) {
        Plan plan = new Plan();
        plan.setTitle(planDTO.getTitle());
        plan.setPlanContent(planDTO.getPlanContent());
        plan.setPublic(planDTO.getIsPublic());

        AppUser createdBy = appUserRepository.findById(planDTO.getCreatedByUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        plan.setCreatedBy(createdBy);

        Plan savedPlan = planRepository.save(plan);
        return convertToDTO(savedPlan);
    }

    public Optional<PlanResponseDTO> updatePlan(String id, PlanDTO planDTO) {
        return planRepository.findById(id)
                .map(existingPlan -> {
                    if (existingPlan.isDeleteStatus()) {
                        return null;
                    }
                    existingPlan.setPublic(planDTO.getIsPublic());
                    existingPlan.setTitle(planDTO.getTitle());
                    existingPlan.setPlanContent(planDTO.getPlanContent());
                    existingPlan.setUpdatedAt(new Date());

                    Plan updatedPlan = planRepository.save(existingPlan);
                    return convertToDTO(updatedPlan);
                });
    }

    public boolean deletePlan(String id) {
        return planRepository.findById(id)
                .map(plan -> {
                    plan.setDeleteStatus(true);
                    plan.setUpdatedAt(new Date());
                    planRepository.save(plan);
                    return true;
                })
                .orElse(false);
    }

    public PlanResponseDTO convertToDTO(Plan plan) {
        PlanResponseDTO dto = new PlanResponseDTO();
        dto.setId(plan.getId());
        dto.setTitle(plan.getTitle());
        dto.setPlanContent(plan.getPlanContent());
        dto.setCreatedAt(plan.getCreatedAt());
        dto.setUpdatedAt(plan.getUpdatedAt());
        dto.setCreatedBy(plan.getCreatedBy());
        dto.setPublic(plan.isPublic());
        return dto;
    }
    public Optional<Plan> updatePublicStatus(String id, boolean isPublic) {
        return planRepository.findById(id).map(plan -> {
            plan.setPublic(isPublic);
            plan.setUpdatedAt(new Date());
            return planRepository.save(plan);
        });
    }
    public List<PlanResponseDTO> getPublicPlans() {
        return planRepository.findByIsPublicAndDeleteStatusFalse(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}