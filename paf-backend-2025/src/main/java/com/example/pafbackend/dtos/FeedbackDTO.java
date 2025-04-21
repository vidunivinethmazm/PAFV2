package com.example.pafbackend.dtos;

import java.util.Date;

public class FeedbackDTO {
    private String id;
    private String feedback;
    private int numOfStars;
    private Date createdAt;
    private String createdByUserId;


    // Constructors
    public FeedbackDTO() {
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public int getNumOfStars() {
        return numOfStars;
    }

    public void setNumOfStars(int numOfStars) {
        this.numOfStars = numOfStars;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }



    // Optional: toString() method for debugging/logging
    @Override
    public String toString() {
        return "FeedbackDTO{" +
                "id='" + id + '\'' +
                ", feedback='" + feedback + '\'' +
                ", numOfStars=" + numOfStars +
                ", createdAt=" + createdAt +
                ", createdByUserId='" + createdByUserId + '\'' +

                '}';
    }
}