import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const CreateFeedbackContainer = ({
  planId,
  onCreate,
  onCancel,
  isSubmitting,
}) => {
  const userId = localStorage.getItem("userId");
  const [feedback, setFeedback] = useState("");
  const [numOfStars, setNumOfStars] = useState(0);
  const [error, setError] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!feedback.trim()) {
      setError("Feedback text is required");
      return;
    }

    if (numOfStars === 0) {
      setError("Please select a star rating");
      return;
    }

    try {
      const feedbackData = {
        feedback,
        numOfStars,
        planId,
        createdByUserId: userId,
      };

      // Reset form
      setFeedback("");
      setNumOfStars(0);

      // Notify parent component
      if (onCreate) {
        onCreate(feedbackData);
      }
    } catch (err) {
      setError(err.message || "Failed to create feedback");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="3"
            placeholder="Share your thoughts about this plan..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className="cursor-pointer"
                  color={
                    ratingValue <= (hoveredRating || numOfStars)
                      ? "#FFBA5A"
                      : "#e4e5e9"
                  }
                  size={24}
                  onClick={() => setNumOfStars(ratingValue)}
                  onMouseEnter={() => setHoveredRating(ratingValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !feedback || numOfStars === 0}
            className={`px-4 py-2 rounded text-white font-medium ${
              isSubmitting || !feedback || numOfStars === 0
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFeedbackContainer;
