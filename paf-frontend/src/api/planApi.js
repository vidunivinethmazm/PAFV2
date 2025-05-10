import apiClient from "./axiosConfig";

export default {
  async getAllPlans() {
    try {
      const response = await apiClient.get("/plans");
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to fetch plans";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  },

  async getPlansByUser(userId) {
    try {
      const response = await apiClient.get(`/plans/user/${userId}`);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to fetch user plans";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  },

  async getPlanById(id) {
    try {
      const response = await apiClient.get(`/plans/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to fetch plan";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Plan not found";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      throw new Error(errorMessage);
    }
  },

  async createPlan(planData) {
    try {
      const response = await apiClient.post("/plans", planData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to create plan";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  },

  async updatePlan(id, planData) {
    try {
      const response = await apiClient.put(`/plans/${id}`, planData);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to update plan";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Plan not found";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      throw new Error(errorMessage);
    }
  },

  async deletePlan(id) {
    try {
      await apiClient.delete(`/plans/${id}`);
      return true;
    } catch (error) {
      let errorMessage = "Failed to delete plan";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Plan not found";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      throw new Error(errorMessage);
    }
  },
};
