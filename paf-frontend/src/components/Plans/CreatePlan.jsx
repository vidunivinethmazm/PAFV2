import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import LoadingSpinner from "../Common/LoadingSpinner";
import Modal from "react-modal";

const CreatePlan = ({ onClose, onSubmit, initialData, mode, open }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [planContent, setPlanContent] = useState(
    initialData?.planContent || ""
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    title: false,
    planContent: false,
  });

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPlanContent(initialData.planContent);
      setIsPublic(initialData.public || false);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";

    // Check if the content is empty or just contains HTML tags without actual content
    const textContent = planContent.replace(/<(.|\n)*?>/g, "").trim();
    if (!textContent) newErrors.planContent = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched when submitting
    setTouched({
      title: true,
      planContent: true,
    });

    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({
        title,
        planContent,
        isPublic,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle content change with validation
  const handleContentChange = (content) => {
    setPlanContent(content);

    if (touched.planContent) {
      const textContent = content.replace(/<(.|\n)*?>/g, "").trim();
      if (!textContent) {
        setErrors((prev) => ({ ...prev, planContent: "Content is required" }));
      } else {
        setErrors((prev) => ({ ...prev, planContent: undefined }));
      }
    }
  };

  // Mark field as touched
  const markAsTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
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
      padding: "16px",
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
    <Modal
      onRequestClose={onClose}
      isOpen={open}
      style={customModalStyles}
      contentLabel={mode === "create" ? "Create Plan" : "Edit Plan"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (touched.title) {
                if (!e.target.value.trim()) {
                  setErrors((prev) => ({
                    ...prev,
                    title: "Title is required",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }
              }
            }}
            onBlur={() => markAsTouched("title")}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter plan title"
            required
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan Content <span className="text-red-500">*</span>
          </label>
          <div
            className={`${
              errors.planContent ? "border border-red-500 rounded-md" : ""
            }`}
          >
            <ReactQuill
              theme="snow"
              value={planContent}
              onChange={handleContentChange}
              onBlur={() => markAsTouched("planContent")}
              modules={modules}
              formats={formats}
              className="h-64 mb-12"
              placeholder="Enter your plan content here..."
            />
          </div>
          {errors.planContent && (
            <p className="mt-1 text-sm text-red-500">{errors.planContent}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Plan Visibility
          </span>
          <button
            type="button"
            onClick={() => setIsPublic(!isPublic)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isPublic ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPublic ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <p className={`text-sm ${
          isPublic ? 'text-blue-600' : 'text-gray-500'
        }`}>
          {isPublic ? 'Public (Visible to everyone)' : 'Private (Only visible to you)'}
        </p>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner size="small" />
            ) : mode === "create" ? (
              "Create Plan"
            ) : (
              "Update Plan"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePlan;
