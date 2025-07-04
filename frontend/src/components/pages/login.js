import { useState } from "react";
import { useAuth } from "./authcontext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/courses";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/login-bg.jpg')" }} // ✅ simpler, uses public folder
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-yellow-800 mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition"
        >
          {loading ? "Processing..." : "Sign in with Google"}
        </button>

        <div className="text-center mt-6 text-yellow-800">
          <p>
            New user?{" "}
            <Link to="/signup" className="text-yellow-700 hover:underline font-semibold">
              Sign up here
            </Link>
          </p>
          <p className="text-sm mt-2">
            <Link to="/forgot-password" className="text-yellow-700 hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
