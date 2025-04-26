import React, { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader";
import FeedbacContainer from "../components/Feedbacks/FeedbacContainer";

const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Create initial bubbles
    const initialBubbles = Array.from({ length: 15 }, () => createBubble());
    setBubbles(initialBubbles);

    // Animation loop to update bubble positions
    const interval = setInterval(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          // Move bubble upward
          const newY = bubble.y - bubble.speed;

          // If bubble goes off screen, reset it at bottom with new random properties
          if (newY < -100) {
            return createBubble(true);
          }

          return {
            ...bubble,
            y: newY,
            x: bubble.x + Math.sin(newY * 0.05) * bubble.wobble, // Add gentle wobble
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Create a new bubble with random properties
  const createBubble = (atBottom = false) => {
    const viewportWidth = window.innerWidth;
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * viewportWidth,
      y: atBottom
        ? window.innerHeight + Math.random() * 100
        : Math.random() * window.innerHeight,
      size: Math.random() * 40 + 10,
      opacity: Math.random() * 0.2 + 0.05,
      speed: Math.random() * 2 + 0.5,
      wobble: Math.random() * 1.5,
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-300 to-blue-500"
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            transform: `scale(${1 + Math.sin(bubble.y * 0.01) * 0.1})`, // Gentle pulsing
          }}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  const [activeKey, setActiveKey] = useState("Posts");

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <BubbleBackground />

      <HomeHeader
        activeKey={activeKey}
        onKeyChange={(key) => {
          setActiveKey(key);
        }}
      />

      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeKey === "Feedbacks" && (
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-md p-4">
              <FeedbacContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
