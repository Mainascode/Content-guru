// src/components/pages/Home.js
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import Footer from "./footer"; // ✅ adjust path if needed

const courseDates = [
  new Date(2025, 6, 2),
  new Date(2025, 6, 10),
  new Date(2025, 6, 17),
];

const Home = () => {
  const [date, setDate] = useState(new Date());

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const match = courseDates.some(d => d.toDateString() === date.toDateString());
      return match ? 'bg-yellow-500 text-white font-bold rounded-full' : null;
    }
  };

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen">
<section className="bg-yellow-100 text-yellow-900 py-16 px-6 sm:px-12">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center"> Content Guru</h2>

    {/* Profile Row */}
    <div className="flex flex-col md:flex-row items-center text-center md:text-left">
      {/* Text */}
      <div>
        <h3 className="text-3xl font-semibold text-yellow-800 mb-4">
          Hello! I'm <span className="text-yellow-600 font-bold">Maureen</span>, a Professional Virtual Assistant & Social Media Manager
        </h3>
        <p className="text-lg text-yellow-700 mb-4">
          I help busy entrepreneurs and growing businesses streamline operations and build a powerful online presence. With a unique blend of administrative expertise and creative digital marketing, I empower clients to scale and shine online.
        </p>
        <p className="text-lg text-yellow-700">
          Content Guru is your one-stop platform for professional growth. We offer expertly curated courses, top-rated books, and powerful marketing services to help creators, educators, and entrepreneurs succeed online.
        </p>
      </div>
    </div>
  </div>
</section>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative h-[90vh] flex flex-col items-center justify-center text-center bg-cover bg-center px-6 sm:px-12"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 opacity-60"></div>

        <div className="relative z-10 text-white max-w-2xl sm:max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl font-extrabold leading-tight"
          >
            Welcome to <span className="text-yellow-400">Content Guru</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-base sm:text-xl text-yellow-100"
          >
            Explore premium courses, bestselling books, and expert promotional services.
          </motion.p>
        </div>

        <motion.a
          href="/courses"
          className="absolute bottom-6 z-10 flex items-center justify-center bg-yellow-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlayCircle className="mr-2" />
          <span className="font-semibold">Explore Courses</span>
        </motion.a>
      </motion.div>

      {/* Calendar Display Section */}
      <section className="bg-yellow-50 text-yellow-900 py-16 px-6 sm:px-12 flex-grow">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Course Calendar</h2>
          <p className="mb-6 text-gray-700 text-sm sm:text-base">
            Highlighted dates represent enrollment days.
          </p>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg inline-block overflow-x-auto">
            <Calendar
              value={date}
              onClickDay={setDate}
              tileClassName={tileClassName}
              className="REACT-CALENDAR"
            />
          </div>
        </div>
      </section>

      {/* Footer after all content */}
      <Footer />
    </div>
  );
};

export default Home;
