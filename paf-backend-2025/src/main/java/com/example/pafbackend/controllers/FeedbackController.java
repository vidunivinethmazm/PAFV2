package com.example.pafbackend.controllers;

import com.example.pafbackend.dtos.CreateFeedbackDTO;
import com.example.pafbackend.dtos.FeedbackDTO;
import com.example.pafbackend.dtos.UpdateFeedbackDTO;
import com.example.pafbackend.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        List<FeedbackDTO> feedbacks = feedbackService.getAllFeedbacks();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable String id) {
        FeedbackDTO feedback = feedbackService.getFeedbackById(id);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FeedbackDTO> createFeedback(
            @RequestBody CreateFeedbackDTO createFeedbackDTO) {
            System.out.println(createFeedbackDTO.getCreatedByUserId());
        FeedbackDTO createdFeedback = feedbackService.createFeedback(createFeedbackDTO,createFeedbackDTO.getCreatedByUserId());
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackDTO> updateFeedback(
            @PathVariable String id,
            @RequestBody UpdateFeedbackDTO updateFeedbackDTO) {
        FeedbackDTO updatedFeedback = feedbackService.updateFeedback(id, updateFeedbackDTO);
        return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable String id) {
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}