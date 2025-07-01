import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const course = searchParams.get("course");

  useEffect(() => {
    if (email && course) {
      axios
        .post("https://content-guru-gpls.onrender.comenroll-student", { email, course })
        .then(() => console.log("✅ Student enrolled successfully"))
        .catch(err => console.error("❌ Enrollment failed", err));

      axios
        .post("https://content-guru-gpls.onrender.com/send-email", { email, course })
        .then(() => console.log("📧 Confirmation email sent"))
        .catch(err => console.error("❌ Email sending failed", err));
    }
  }, [email, course]);

  return (
    <div className="text-center py-24 px-4 bg-yellow-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-lg text-yellow-800 mb-8">
        You are now enrolled in the <span className="font-semibold">{course}</span> course.
      </p>
      <a
        href="/courses"
        className="px-6 py-3 bg-yellow-700 text-white rounded-full font-semibold hover:bg-yellow-800 transition"
      >
        Back to Courses
      </a>
    </div>
  );
};

export default Success;
