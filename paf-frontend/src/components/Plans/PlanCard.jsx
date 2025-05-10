import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

const PlanCard = ({
  plan,
  userId,
  onEdit,
  onDelete,
  openMenuId,
  toggleMenu,
  closeMenu,
}) => {
  return (
    <div
      key={plan.id}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 relative w-full"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {plan.title}
          </h3>
          {plan.createdBy.id === userId && (
            <div className="relative">
              <button
                onClick={() => toggleMenu(plan.id)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiMoreVertical className="h-5 w-5" />
              </button>

              {openMenuId === plan.id && (
                <>
                  {/* Click outside to close */}
                  <div className="fixed inset-0 z-20" onClick={closeMenu} />

                  {/* Menu dropdown */}
                  <div className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(plan);
                          closeMenu();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiEdit2 className="mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(plan.id);
                          closeMenu();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FiTrash2 className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div
          className="text-gray-600 mt-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: plan.planContent }}
        />
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Created by: {plan.createdBy.id === userId ? "You" : "Other"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
