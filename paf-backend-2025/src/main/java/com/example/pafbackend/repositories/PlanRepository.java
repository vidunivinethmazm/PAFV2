package com.example.pafbackend.repositories;

import com.example.pafbackend.models.Plan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends MongoRepository<Plan, String> {
    List<Plan> findByCreatedByIdAndDeleteStatusFalse(String userId);
    List<Plan> findByDeleteStatusFalse();
    Optional<Plan> findByIdAndDeleteStatusFalse(String id);

    List<Plan> findByIsPublicAndDeleteStatusFalse(boolean isPublic);
}