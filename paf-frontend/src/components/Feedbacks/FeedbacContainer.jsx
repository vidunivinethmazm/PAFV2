import React, { useState, useEffect } from "react";
import feedbacksApi from "../../api/feedbacksApi";
import FeedbackCard from "./FeedbackCard";
import { FiPlus } from "react-icons/fi";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import CreateFeedbackContainer from "./CreateFeedbackContainer";

// Initialize Modal for accessibility
Modal.setAppElement("#root"); // Set this to your root element ID

const FeedbackContainer = ({ planId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreatingFeedback, setIsCreatingFeedback] = useState(false);
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      // If planId is provided, fetch feedbacks for that plan, otherwise fetch all
      const data = planId
        ? await feedbacksApi.getFeedbacksByPlanId(planId)
        : await feedbacksApi.getAllFeedbacks();
      setFeedbacks(data.reverse());
    } catch (err) {
      setError(err.message || "Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        // If planId is provided, fetch feedbacks for that plan, otherwise fetch all
        const data = planId
          ? await feedbacksApi.getFeedbacksByPlanId(planId)
          : await feedbacksApi.getAllFeedbacks();
        setFeedbacks(data.reverse());
      } catch (err) {
        setError(err.message || "Failed to load feedbacks");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [planId, isCreatingFeedback]);

  const handleCreateFeedback = async (feedbackData) => {
    try {
      setIsCreatingFeedback(true);
      await feedbacksApi.createFeedback(feedbackData);
      setShowCreateModal(false);
      // Refresh feedbacks after creating a new one
      const data = planId
        ? await feedbacksApi.getFeedbacksByPlanId(planId)
        : await feedbacksApi.getAllFeedbacks();
      setFeedbacks(data.reverse());
    } catch (err) {
      setError(err.message || "Failed to create feedback");
    } finally {
      setIsCreatingFeedback(false);
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  // Custom styles for the modal
  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      padding: "0",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      {/* Header with Create Feedback Button */}
      <div className="sticky top-0 z-10 bg-white shadow-sm mb-6 p-4 flex justify-between items-center rounded-lg">
        <h1 className="text-xl font-bold">Feedbacks</h1>
        <button
          onClick={() => {
            if (localStorage.getItem("userId")) {
              setShowCreateModal(true);
            } else {
              navigate("/login");
            }
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <FiPlus size={18} />
          <span>Add Feedback</span>
        </button>
      </div>

      {/* Create Feedback Modal */}
      <Modal
        isOpen={showCreateModal}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Create New Feedback"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Your Feedback</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <CreateFeedbackContainer
            planId={planId}
            onCreate={handleCreateFeedback}
            onCancel={closeModal}
            isSubmitting={isCreatingFeedback}
          />
        </div>
      </Modal>

      {/* Feedbacks List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium mb-2">No feedbacks yet</p>
            <p className="text-sm">Be the first to share your thoughts!</p>
            <button
              onClick={() => {
                if (localStorage.getItem("userId")) {
                  setShowCreateModal(true);
                } else {
                  navigate("/login");
                }
              }}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto hover:bg-indigo-700 transition-colors"
            >
              <FiPlus size={18} />
              <span>Add Feedback</span>
            </button>
          </div>
        ) : (
          feedbacks.map((feedback) => (
            <FeedbackCard
              onDelete={fetchFeedbacks}
              onUpdate={fetchFeedbacks}
              key={feedback.id}
              feedback={feedback}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackContainer;
