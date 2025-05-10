package com.example.pafbackend.controllers;

import com.example.pafbackend.dtos.PlanDTO;
import com.example.pafbackend.dtos.PlanResponseDTO;
import com.example.pafbackend.dtos.PublicStatusRequest;
import com.example.pafbackend.models.Plan;
import com.example.pafbackend.services.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<List<PlanResponseDTO>> getAllPlans() {
        return ResponseEntity.ok(planService.getAllPlans());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PlanResponseDTO>> getPlansByUser(@PathVariable String userId) {
        return ResponseEntity.ok(planService.getPlansByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanResponseDTO> getPlanById(@PathVariable String id) {
        return planService.getPlanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PlanResponseDTO> createPlan(@RequestBody PlanDTO planDTO) {
        return ResponseEntity.ok(planService.createPlan(planDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanResponseDTO> updatePlan(
            @PathVariable String id,
            @RequestBody PlanDTO planDTO) {
        return planService.updatePlan(id, planDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/public")
    public ResponseEntity<List<PlanResponseDTO>> getPublicPlans() {
        return ResponseEntity.ok(planService.getPublicPlans());
    }

    @PatchMapping("/{id}/public-status")
    public ResponseEntity<PlanResponseDTO> updatePublicStatus(
            @PathVariable String id,
            @RequestBody boolean isPublic) {
        return planService.updatePublicStatus(id, isPublic)
                .map(planService::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable String id) {
        if (planService.deletePlan(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}