import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext"; // adjust path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRating from "../StarRating"; // adjust path as needed
const token = localStorage.getItem("token");
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
// Inside a CourseDetails or BookDetails page
<StarRating
  onSubmit={(data) => {
    fetch("https://content-guru.onrender.com/api/submit-rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        service_type: "course",
        service_id: courses.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert("Thanks for your rating!"));
  }}
/>

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center text-gray-800 mb-6"
      >
        Courses
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md transition-transform hover:scale-110"
            />
            <h2 className="mt-6 text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {course.title}
            </h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-lg font-semibold text-green-600 mt-4">${course.price}</p>

            <button
              onClick={() => handleEnroll(course)}
              className="w-full px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
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
