
import { useState } from "react";

export default function BlogSubscribe() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://content-guru.onrender.com/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSuccess("🎉 Subscribed successfully!");
      setEmail("");
    } catch {
      setSuccess("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="mt-10 max-w-lg mx-auto bg-yellow-50 p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-3 text-yellow-800">📧 Join our mailing list!</h3>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 border border-yellow-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition"
        >
          Subscribe
        </button>
      </form>
      {success && <p className="mt-4 text-green-700">{success}</p>}
    </div>
  );
}
