package com.example.pafbackend.dtos;

public class PlanDTO {
    private String title;
    private String planContent;
    private String createdByUserId;

    public boolean getIsPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
       this.isPublic = isPublic;
    }

    private boolean isPublic;

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPlanContent() {
        return planContent;
    }

    public void setPlanContent(String planContent) {
        this.planContent = planContent;
    }

    public String getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(String createdByUserId) {
        this.createdByUserId = createdByUserId;
    }
}