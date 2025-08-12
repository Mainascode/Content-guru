import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const courses = [
  {
    title: "Virtual Assistant Mastery",
    description: "Comprehensive training on VA skills, productivity, and management.",
    price: 99,
    img: "/images/va-course.jpg",
    id: 1,
  },
  {
    title: "Social Media Management",
    description: "Learn how to manage social media accounts professionally.",
    price: 79,
    img: "/images/social-media-course.jpg",
    id: 2,
  },
  {
    title: "Freelancing 101",
    description: "Kickstart your freelancing journey with proven strategies.",
    price: 49,
    img: "/images/freelancing-course.jpg",
    id: 3,
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const handleEnroll = (course) => {
    if (!isAuthenticated) {
      toast.warn("Please login or sign up to enroll.", { position: "top-center" });
      return navigate("/login");
    }
    navigate(`/enroll/${course.id}`, { state: { course } });
  };

return (
  <div className="relative min-h-screen bg-white">
    {/* ✅ Header Block with Brown Background */}
    <div className="bg-yellow-800 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold text-white"
      >
        Courses
      </motion.h1>
    </div>

    {/* ✅ Courses Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 py-16">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <img
            src={course.img}
            alt={course.title}
            className="w-full h-40 object-cover rounded-md transition-transform hover:scale-110"
          />
          <h2 className="mt-6 text-2xl font-semibold text-yellow-800 hover:text-yellow-700 transition-colors">
            {course.title}
          </h2>
          <p className="text-gray-700 mt-2">{course.description}</p>
          <p className="text-lg font-semibold text-yellow-900 mt-4">
            ${course.price}
          </p>

          <button
            onClick={() => handleEnroll(course)}
            className="w-full px-6 py-3 mt-4 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all transform hover:scale-105"
          >
            Enroll Now
          </button>
        </motion.div>
      ))}
    </div>
  </div>
);

};

export default Courses;
