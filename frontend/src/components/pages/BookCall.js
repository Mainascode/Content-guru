// src/components/pages/BookCall.js
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookCall = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    // Combine message with sender info
    const fullMessage = `
📞 New Call Booking Request
────────────────────────────
👤 Name: ${formData.name}
✉️ Email: ${formData.email}
📅 Preferred Date: ${date ? date.toDateString() : "Not selected"}
⏰ Preferred Time: ${time || "Not specified"}

📝 Message:
${formData.message || "(No additional message provided)"}
`;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: fullMessage,
    };

    emailjs
      .send(
        "service_0memxwa", // your service ID
        "template_i8zr4ta", // your template ID
        templateParams,
        "z-EXX9a-CCPKbQ8xG" // your public key
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setDate(null);
          setTime("");
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <div className="pt-28 pb-16 px-6 bg-yellow-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-yellow-800 mb-6">
          Book a Free Call
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Let’s connect and talk about how we can grow your brand together. 
          Pick a date and time that works for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Preferred Date
            </label>
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              minDate={new Date()}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholderText="Select a date"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Preferred Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Message (optional)
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholder="Tell us what you'd like to discuss..."
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
          >
            {status === "loading" ? "Booking..." : "Book Call"}
          </motion.button>
        </form>

        {/* Status messages */}
        {status === "success" && (
          <p className="mt-4 text-green-600 text-center font-medium">
          Your booking request has been sent! We’ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600 text-center font-medium">
            Oops! Something went wrong. Try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCall;
