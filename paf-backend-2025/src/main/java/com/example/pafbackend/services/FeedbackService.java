package com.example.pafbackend.services;

import com.example.pafbackend.dtos.*;
import com.example.pafbackend.models.Feedback;
import com.example.pafbackend.models.AppUser;
import com.example.pafbackend.models.Plan;
import com.example.pafbackend.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final AppUserService appUserService;


    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository,
                           AppUserService appUserService
                           ) {
        this.feedbackRepository = feedbackRepository;
        this.appUserService = appUserService;

    }

    public List<FeedbackDTO> getAllFeedbacks() {
        return feedbackRepository.findByDeleteStatusFalse()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }



    public FeedbackDTO getFeedbackById(String id) {
        Feedback feedback = feedbackRepository.findByIdAndDeleteStatusFalse(id);
        return convertToDTO(feedback);
    }

    public FeedbackDTO createFeedback(CreateFeedbackDTO createFeedbackDTO, String userId) {
        Optional<UserProfileDTO> user = appUserService.getUserById(userId);
        System.out.println(user.isPresent());


        AppUser appUser = new AppUser();


        if (user.isPresent()) {
            UserProfileDTO userDTO = user.get();
            appUser.setId(userDTO.getId());
            appUser.setFirstName(userDTO.getFirstName());
            appUser.setLastName(userDTO.getLastName());
            appUser.setBio(userDTO.getBio());
            appUser.setProfileImageUrl(userDTO.getProfileImageUrl());
            appUser.setUsername(userDTO.getUsername());
            appUser.setEmail(userDTO.getEmail());
            appUser.setContactNumber(userDTO.getContactNumber());
            appUser.setPublicStatus(userDTO.isPublicStatus());
            appUser.setCreatedAt(userDTO.getCreatedAt());
        }


        Feedback feedback = new Feedback();
        feedback.setFeedback(createFeedbackDTO.getFeedback());
        feedback.setNumOfStars(createFeedbackDTO.getNumOfStars());
        feedback.setCreatedBy(appUser);


        Feedback savedFeedback = feedbackRepository.save(feedback);
        return convertToDTO(savedFeedback);
    }

    public FeedbackDTO updateFeedback(String id, UpdateFeedbackDTO updateFeedbackDTO) {
        Feedback feedback = feedbackRepository.findByIdAndDeleteStatusFalse(id);

        feedback.setFeedback(updateFeedbackDTO.getFeedback());
        feedback.setNumOfStars(updateFeedbackDTO.getNumOfStars());

        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return convertToDTO(updatedFeedback);
    }

    public void deleteFeedback(String id) {
        Feedback feedback = feedbackRepository.findByIdAndDeleteStatusFalse(id);


        feedback.setDeleteStatus(true);
        feedbackRepository.save(feedback);
    }

    private FeedbackDTO convertToDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setFeedback(feedback.getFeedback());
        dto.setNumOfStars(feedback.getNumOfStars());
        dto.setCreatedAt(feedback.getCreatedAt());
        dto.setCreatedByUserId(feedback.getCreatedBy().getId());

        return dto;
    }
}