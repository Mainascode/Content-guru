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
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="border px-3 py-2 w-full mb-3"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit">
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-600 mt-3">{message}</p>}
    </div>
  );
}
