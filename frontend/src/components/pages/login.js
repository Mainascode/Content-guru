// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "./authcontext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/courses";

  // common toast style
  const notify = (msg, type = "info") => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify(" Please fill in both email and password.", "warning");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging you in...");
    try {
      await login(email, password);
      toast.update(toastId, {
        render: "Login successful — welcome back!",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      toast.update(toastId, {
        render: ` Login failed: ${err.message || "Invalid credentials"}`,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const toastId = toast.loading(" Connecting with Google...");
    try {
      await googleLogin();
      toast.update(toastId, {
        render: " Google login successful — redirecting...",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      toast.update(toastId, {
        render: ` Google login failed: ${err.message || "Try again later"}`,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
    >
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-[#5C4033] mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5C4033] hover:bg-[#4B352A] text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 py-3 bg-[#7B5E57] hover:bg-[#5C4033] text-white font-semibold rounded-md transition"
        >
          {loading ? "Processing..." : "Sign in with Google"}
        </button>

        <div className="text-center mt-6 text-[#5C4033]">
          <p>
            New user?{" "}
            <Link
              to="/signup"
              className="text-[#7B5E57] hover:underline font-semibold"
            >
              Sign up here
            </Link>
          </p>
          <p className="text-sm mt-2">
            <Link
              to="/forgot-password"
              className="text-[#7B5E57] hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
