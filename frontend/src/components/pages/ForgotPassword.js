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
    <div className="max-w-sm mx-auto mt-20 px-4">
      <h2 className="text-3xl font-extrabold text-center text-yellow-800 mb-6">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit} className="bg-yellow-50 p-6 rounded-lg shadow-md space-y-4">
        <input
          type="email"
          className="border border-yellow-300 rounded px-4 py-3 w-full focus:ring focus:ring-yellow-200"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-700 text-white font-semibold py-3 rounded hover:bg-yellow-800 transition"
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
  );
}
