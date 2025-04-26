import React from "react";

const HomeHeader = ({ activeKey, onKeyChange }) => {
  const tabs = [
    {
      key: "Feedbacks",
      label: "Feedbacks",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 py-4">
            <span className="text-white text-xl font-bold">
              Let's Share Knowledge
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onKeyChange(tab.key)}
                className={`
                  px-4 py-3 flex items-center space-x-2 font-medium rounded-t-lg transition-all duration-200
                  ${
                    activeKey === tab.key
                      ? "bg-white text-indigo-600 shadow-lg transform -translate-y-1"
                      : "text-white hover:bg-white/10"
                  }
                `}
              >
                <span
                  className={
                    activeKey === tab.key ? "text-indigo-600" : "text-white"
                  }
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>

                {/* Active indicator with animated dot */}
                {activeKey === tab.key && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex">
                    <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
