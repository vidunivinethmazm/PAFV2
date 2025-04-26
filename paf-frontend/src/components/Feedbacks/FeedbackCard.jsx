import React, { useState } from "react";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import feedbacksApi from "../../api/feedbacksApi";

const FeedbackCard = ({ feedback, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState(feedback.feedback);
  const [editedStars, setEditedStars] = useState(feedback.numOfStars);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!editedFeedback.trim()) {
        setError("Feedback text is required");
        setIsSubmitting(false);
        return;
      }

      const updatedData = {
        feedback: editedFeedback,
        numOfStars: editedStars,
      };

      const updatedFeedback = await feedbacksApi.updateFeedback(
        feedback.id,
        updatedData
      );
      setIsEditing(false);

      // Notify parent component about the update
      if (onUpdate) {
        onUpdate(updatedFeedback);
      }
    } catch (err) {
      setError(err.message || "Failed to update feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await feedbacksApi.deleteFeedback(feedback.id);

        // Notify parent component about the deletion
        if (onDelete) {
          onDelete(feedback.id);
        }
      } catch (err) {
        setError(err.message || "Failed to delete feedback");
      }
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedFeedback(feedback.feedback);
    setEditedStars(feedback.numOfStars);
    setError("");
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Edit Rating
            </label>
            <div className="flex mb-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="cursor-pointer"
                    color={
                      ratingValue <= (hoveredRating || editedStars)
                        ? "#FFBA5A"
                        : "#e4e5e9"
                    }
                    size={24}
                    onClick={() => setEditedStars(ratingValue)}
                    onMouseEnter={() => setHoveredRating(ratingValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                );
              })}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Edit Feedback
            </label>
            <textarea
              value={editedFeedback}
              onChange={(e) => setEditedFeedback(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !editedFeedback.trim()}
              className={`px-3 py-1 rounded text-white font-medium text-sm ${
                isSubmitting || !editedFeedback.trim()
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                color={index < feedback.numOfStars ? "#FFBA5A" : "#e4e5e9"}
                size={18}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {feedback.createdAt &&
              new Date(feedback.createdAt).toLocaleDateString()}
          </p>
        </div>
        {localStorage.getItem("userId") === feedback.createdByUserId && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-indigo-600"
              title="Edit feedback"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-red-600"
              title="Delete feedback"
            >
              <FaTrash size={16} />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-700">{feedback.feedback}</p>
    </div>
  );
};

export default FeedbackCard;
