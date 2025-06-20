import { useState } from "react";
import { useAuth } from "./authcontext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("Student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      toast.success("Signup successful");
      navigate("/courses");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Signed up with Google");
      navigate("/courses");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit} className="text-left">
          <label className="block mt-5 mb-1 font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-2 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mt-5 mb-1 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mt-5 mb-1 font-semibold text-gray-700">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
            className="w-full p-2 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
          </select>

          <label className="block mt-5 mb-1 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mt-5 mb-1 font-semibold text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-black to-indigo-700 text-white py-2 rounded mt-6 hover:bg-black transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            {loading ? "Processing..." : "Sign up with Google"}
          </button>
        </div>

        <p className="mt-6 text-gray-700 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
