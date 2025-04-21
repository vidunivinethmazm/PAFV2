package com.example.pafbackend.dtos;

public class UpdateFeedbackDTO {
    private String feedback;
    private int numOfStars;

    // Constructors
    public UpdateFeedbackDTO() {
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
        return "UpdateFeedbackDTO{" +
                "feedback='" + feedback + '\'' +
                ", numOfStars=" + numOfStars +
                '}';
    }
}