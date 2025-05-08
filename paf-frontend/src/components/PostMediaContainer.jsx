import React, { useEffect, useState } from "react";

const PostMediaCarousel = ({ post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaTypes, setMediaTypes] = useState([]);

  useEffect(() => {
    setMediaTypes(post.mediaTypes);
  }, [post]);

  if (!mediaTypes || mediaTypes.length === 0) {
    return <div />;
  }

  const totalItems = mediaTypes.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentMedia = mediaTypes[currentIndex];

  return (
    <div className="relative w-full">
      {/* Main carousel container */}
      <div className="relative w-full h-96 bg-gray-100 overflow-hidden rounded-lg">
        {/* Media item */}
        <div className="w-full h-full flex items-center justify-center">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt={`Post media ${currentIndex}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              src={currentMedia.url}
              controls
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Navigation arrows - only show if there's more than one item */}
        {totalItems > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Indicators for multiple items */}
      {totalItems > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {mediaTypes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostMediaCarousel;
