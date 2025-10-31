import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

const Success = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const course = searchParams.get("course");

  useEffect(() => {
    // API calls
    if (email && course) {
      axios
        .post("https://content-guru-gpls.onrender.com/enroll-student", { email, course })
        .then(() => console.log("Student enrolled successfully"))
        .catch(err => console.error("Enrollment failed", err));

      axios
        .post("https://content-guru-gpls.onrender.com/send-email", { email, course })
        .then(() => console.log("Confirmation email sent"))
        .catch(err => console.error("Email sending failed", err));
    }

    // 🎉 Confetti animation
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#34D399", "#6EE7B7", "#A7F3D0"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#34D399", "#6EE7B7", "#A7F3D0"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [email, course]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white text-center px-6 py-16">
      {/* Animated success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="text-green-500 mb-6"
      >
        <CheckCircle size={100} className="animate-pulse" />
      </motion.div>

      {/* Success message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl font-extrabold text-green-600 mb-4"
      >
        Payment Successful!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg sm:text-xl text-gray-700 max-w-md leading-relaxed mb-8"
      >
        🎓 Congratulations! You’re now officially enrolled in{" "}
        <span className="font-semibold text-green-700">{course}</span>.
        <br /> A confirmation email has been sent to{" "}
        <span className="font-medium text-green-800">{email}</span>.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/courses"
          className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300"
        >
          Back to Courses
        </Link>
      </motion.div>

      {/* Decorative footer note */}
      <p className="mt-10 text-sm text-gray-500">
        Need help? Contact us at{" "}
        <a
          href="mailto:yourcontentsocial@gmail.com"
          className="text-green-700 font-medium hover:underline"
        >
          yourcontentsocial@gmail.com
        </a>
      </p>
    </div>
  );
};

export default Success;
