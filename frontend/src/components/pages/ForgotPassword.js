import { useState } from "react";
import { useAuth } from "./authcontext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage("✅ Reset link sent! Check your email.");
    } catch (err) {
      setMessage("❌ Failed to send. Check the email address.");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
    <div className="max-w-sm w-full">
      <h2 className="text-3xl font-extrabold text-center text-yellow-800 mb-6 relative">
        Reset Password
        <span className="block w-12 h-1 bg-yellow-600 mx-auto mt-2 rounded"></span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-yellow-200"
      >
        <input
          type="email"
          className="border border-yellow-300 rounded px-4 py-3 w-full focus:ring-2 focus:ring-yellow-300 focus:outline-none transition"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-700 text-white font-semibold py-3 rounded-lg hover:bg-yellow-800 transition transform hover:scale-[1.02]"
        >
          Send Reset Link
        </button>
      </form>

      {message && (
        <p className="text-center mt-4 text-yellow-700 font-medium">
          {message}
        </p>
      )}
    </div>
  </div>
);
}