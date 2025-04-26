package com.example.pafbackend.repositories;

import com.example.pafbackend.models.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByDeleteStatusFalse();
    Feedback findByIdAndDeleteStatusFalse(String id);
}