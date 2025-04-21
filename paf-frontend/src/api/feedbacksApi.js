import apiClient from "./axiosConfig";

export default {
  async getAllFeedbacks() {
    try {
      const response = await apiClient.get("/feedbacks");
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to fetch feedbacks";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  },

  async getFeedbacksByPlanId(planId) {
    try {
      const response = await apiClient.get(`/feedbacks/plan/${planId}`);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to fetch feedbacks for this plan";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  },

  async getFeedbackById(id) {
    try {
      const response = await apiClient.get(`/feedbacks/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to fetch feedback";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Feedback not found";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      throw new Error(errorMessage);
    }
  },

  async createFeedback(feedbackData) {
    try {
      const response = await apiClient.post("/feedbacks", feedbackData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to create feedback";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  },

  async updateFeedback(id, feedbackData) {
    try {
      const response = await apiClient.put(`/feedbacks/${id}`, feedbackData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to update feedback";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Feedback not found";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      throw new Error(errorMessage);
    }
  },

  async deleteFeedback(id) {
    try {
      await apiClient.delete(`/feedbacks/${id}`);
      return true;
    } catch (error) {
      let errorMessage = "Failed to delete feedback";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Feedback not found";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      throw new Error(errorMessage);
    }
  },
};
