import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const course = searchParams.get("course");

  useEffect(() => {
    if (email && course) {
      axios.post("http://localhost:5000/enroll-student", { email, course })
        .then(() => console.log("Student enrolled successfully"))
        .catch(err => console.error("Enrollment failed", err));
  
      axios.post("http://localhost:5000/send-email", { email, course })
        .then(() => console.log("Confirmation email sent"))
        .catch(err => console.error("Email sending failed", err));
    }
  }, [email, course]);
  

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
      <p className="text-lg mt-4">You are now enrolled in the {course} course.</p>
      <a href="/courses" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">
        Back to Courses
      </a>
    </div>
  );
};

export default Success;
