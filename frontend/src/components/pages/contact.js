import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://content-guru.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="max-w-2xl mx-auto px-6 py-12 pt-24">
  <h1 className="text-4xl font-extrabold text-center text-yellow-800 mb-12">
    Get In Touch
  </h1>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
          ✅ Message sent successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-yellow-50 p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-semibold text-yellow-900 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:ring focus:ring-yellow-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-yellow-900 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:ring focus:ring-yellow-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-yellow-900 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:ring focus:ring-yellow-200"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-700 text-white font-semibold py-3 rounded-md hover:bg-yellow-800 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
