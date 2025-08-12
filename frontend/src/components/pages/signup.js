import { useState } from "react";
import { useAuth } from "./authcontext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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
  <div
    className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
    style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
  >
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md border border-yellow-200">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-800 mb-6 text-center">
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Full Name", type: "text", value: fullName, setValue: setFullName },
          { label: "Email", type: "email", value: email, setValue: setEmail },
          { label: "Password", type: "password", value: password, setValue: setPassword },
          { label: "Confirm Password", type: "password", value: confirmPassword, setValue: setConfirmPassword }
        ].map((field, i) => (
          <div key={i}>
            <label className="block mb-1 font-semibold text-yellow-800">{field.label}</label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              required
              className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-700 hover:bg-yellow-800 text-white py-3 rounded-lg font-semibold transition-all"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2"
      >
        <img src="/images/google-icon.svg" alt="Google" className="w-5 h-5" />
        {loading ? "Processing..." : "Sign up with Google"}
      </button>

      <p className="mt-6 text-yellow-800 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Log in
        </Link>
      </p>
    </div>
  </div>
);
}
