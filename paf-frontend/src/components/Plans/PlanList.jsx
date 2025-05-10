import React, { useState } from "react";

import PlanCard from "./PlanCard";

const PlanList = ({ plans, userId, onEdit, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No plans created yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Scrollable container for cards */}
      <div className="overflow-y-auto w-full flex-grow pr-2">
        {/* Single column layout for full width cards */}
        <div className="flex flex-col space-y-4 pb-4">
          {plans.map((plan) => (
            <PlanCard
              openMenuId={openMenuId}
              toggleMenu={toggleMenu}
              closeMenu={closeMenu}
              userId={userId}
              onEdit={onEdit}
              onDelete={onDelete}
              plan={plan}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanList;
