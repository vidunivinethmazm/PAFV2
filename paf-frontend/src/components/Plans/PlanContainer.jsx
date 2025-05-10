import React, { useState, useEffect } from "react";
import CreatePlan from "./CreatePlan";
import PlanList from "./PlanList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import planApi from "../../api/planApi";
import LoadingSpinner from "../Common/LoadingSpinner";

const PlanContainer = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      let userPlans = await planApi.getAllPlans();
      userPlans=  userPlans.reverse();
      userPlans = userPlans.filter((plan)=>{
        return localStorage.getItem("userId") === plan.createdBy.id || plan.public 
      })
      setPlans(userPlans);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (planData) => {
    try {
      setLoading(true);
      const newPlan = await planApi.createPlan({
        ...planData,
        createdByUserId: userId,
      });
      setPlans([newPlan, ...plans]);
      toast.success("Plan created successfully!");
      setShowCreateModal(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (id, planData) => {
    try {
      setLoading(true);
      await planApi.updatePlan(id, {
            ...planData,
          });
        await fetchPlans();
      toast.success("Plan updated successfully!");
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      setLoading(true);
      await planApi.deletePlan(id);
      await fetchPlans();
      toast.success("Plan deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && plans.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Plans</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Create New Plan
        </button>
      </div>

      <PlanList
        plans={plans}
        userId={userId}
        onEdit={(plan) => {
          setCurrentPlan(plan);
          setShowEditModal(true);
        }}
        onDelete={handleDeletePlan}
      />

      {showCreateModal && (
        <CreatePlan
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePlan}
          mode="create"
          open={showCreateModal}
        />
      )}

      {showEditModal && (
        <CreatePlan
          onClose={() => setShowEditModal(false)}
          onSubmit={(data) => handleUpdatePlan(currentPlan.id, data)}
          initialData={currentPlan}
          mode="edit"
          open={showEditModal}
        />
      )}
    </div>
  );
};

export default PlanContainer;
