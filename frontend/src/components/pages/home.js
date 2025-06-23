import { motion } from "framer-motion";
import { FaBook, FaPlayCircle, FaBullhorn } from "react-icons/fa";
// Ensure footer file is properly included

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center px-6 sm:px-12"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-60"></div>
        <div className="relative z-10 text-white max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl font-extrabold leading-tight"
          >
            Welcome to <span className="text-blue-400">Content Guru</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg sm:text-xl text-gray-300"
          >
            Explore premium courses, bestselling books, and expert promotional services.
          </motion.p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {[
              { href: "/courses", text: "Explore Courses", icon: <FaPlayCircle />, bg: "bg-blue-600", hover: "hover:bg-blue-700" },
              { href: "/books", text: "Buy Books", icon: <FaBook />, bg: "bg-green-600", hover: "hover:bg-green-700" },
              { href: "/services", text: "Promotion Services", icon: <FaBullhorn />, bg: "bg-red-600", hover: "hover:bg-red-700" },
            ].map((btn, index) => (
              <motion.a
                key={index}
                href={btn.href}
                className={`flex items-center justify-center ${btn.bg} text-white px-6 py-3 rounded-full shadow-lg transition-all transform ${btn.hover} hover:scale-110 w-full sm:w-auto`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
              >
                {btn.icon} <span className="ml-2 font-semibold">{btn.text}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Home;
