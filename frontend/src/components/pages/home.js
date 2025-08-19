import  { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Track mouse movement
  useEffect(() => {
    const moveCursor = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Cursor styles
  const variants = {
    default: {
      x: cursor.x - 16,
      y: cursor.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(234, 179, 8, 0.7)", // yellow-500/70
      mixBlendMode: "multiply",
    },
    hover: {
      x: cursor.x - 32,
      y: cursor.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(34,197,94,0.6)", // green-500/60
      mixBlendMode: "screen",
    },
  };

  // Handlers
  const handleMouseEnter = () => setCursorVariant("hover");
  const handleMouseLeave = () => setCursorVariant("default");

  return (
    <div className="relative bg-yellow-50 min-h-screen overflow-hidden">
      {/* ✨ Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-800 mb-4">
          Turn Ideas Into <span className="text-green-700">Impactful Content</span>
        </h1>
        <p className="text-lg text-yellow-700 mb-8 max-w-2xl">
          Helping businesses, professionals, and learners create content strategies
          that drive results.
        </p>
        <div className="space-x-4">
          <a
            href="/contact"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="px-6 py-3 bg-yellow-700 text-white rounded-full font-semibold hover:bg-yellow-800 transition"
          >
            Work With Us
          </a>
          <a
            href="/courses"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
          >
            Explore Courses
          </a>
        </div>
      </section>

      {/* ✨ Image Cards with Bounce + Drag */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 py-16">
        {["/images/content1.jpg", "/images/content2.jpg", "/images/content3.jpg"].map(
          (img, i) => (
            <motion.div
              key={i}
              drag
              dragElastic={0.2}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={img} alt={`content-${i}`} className="w-full h-64 object-cover" />
              <div className="p-4 text-yellow-800 font-semibold">
                Content Strategy {i + 1}
              </div>
            </motion.div>
          )
        )}
      </section>
    </div>
  );
};

export default Home;
