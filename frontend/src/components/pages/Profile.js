import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [photoURL] = useState(user?.photoURL || "");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleConfirmLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md mb-4 object-cover"
            />
          ) : (
            <FaUserCircle className="text-yellow-500 text-7xl mb-4" />
          )}
          <h2 className="text-xl font-semibold text-yellow-800">Your Profile</h2>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-yellow-700 font-medium">Name</label>
            <div className="w-full px-4 py-2 bg-yellow-100 border border-yellow-200 rounded">
              {user.displayName || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-yellow-700 font-medium">Email</label>
            <div className="w-full px-4 py-2 bg-yellow-100 border border-yellow-200 rounded">
              {user.email}
            </div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔔 Logout confirmation modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-80 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                Are you sure you want to logout?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
