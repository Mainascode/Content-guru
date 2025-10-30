// src/pages/Contact.js
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    emailjs
      .send(
        "service_0memxwa",  
        "template_i8zr4ta", 
        form,
        "z-EXX9a-CCPKbQ8xG"   
      )
      .then(() => {
        setSuccess("Your request has been sent! We’ll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setSuccess("Could not send email. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="bg-yellow-50 py-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Let’s Talk 📬
          </h2>
          <p className="text-gray-700 text-lg">
            Got a project, collaboration idea, or just want to say hi?  
            Fill in the form and we’ll respond within 24 hours.
          </p>
          <div className="space-y-4 text-gray-800">
            <p className="flex items-center gap-3"><FaEnvelope /> yourcontentsocial@gmail.com</p>
            <p className="flex items-center gap-3"><FaPhone /> +123 555 673</p>
            <p className="flex items-center gap-3"><FaMapMarkerAlt /> International</p>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-3 rounded-xl font-semibold hover:bg-yellow-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-center font-semibold text-gray-700">{success}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
