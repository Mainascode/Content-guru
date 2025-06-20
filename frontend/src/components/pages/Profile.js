import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [photoURL] = useState(user?.photoURL || "");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = async () => {
    if (window.confirm("Logout?")) {
      await logout();
      navigate("/login");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md mb-4 object-cover"
            />
          ) : (
            <FaUserCircle className="text-blue-500 text-7xl mb-4" />
          )}
          <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <div className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded">
              {user.displayName || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded">
              {user.email}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
