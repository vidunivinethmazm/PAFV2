package com.example.pafbackend.dtos;

public class CreateFeedbackDTO {
    private String feedback;
    private int numOfStars;


    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    private String createdByUserId;

    // Constructors
    public CreateFeedbackDTO() {
    }

    // Getters and Setters
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



    // Optional toString() method
    @Override
    public String toString() {
        return "CreateFeedbackDTO{" +
                "feedback='" + feedback + '\'' +
                ", numOfStars=" + numOfStars +

                '}';
    }
}