// /src/pages/Enrollment.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from "./authcontext";

const Enrollment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
  });

  useEffect(() => {
    if (!course) {
      alert("Course not found. Redirecting to course list.");
      navigate("/courses");
    }
  }, [course, navigate]);

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEnrollment = async () => {
    try {
      const response = await fetch("http://localhost:5001/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          course_id: course.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Enrollment successful!");
        navigate("/payment-success");
      } else {
        alert(data.message || "Enrollment failed.");
      }
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      submitEnrollment();
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Enroll in {course?.title}
      </h1>

      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={!!user}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-6 text-center">
          <PayPalScriptProvider options={{ "client-id":  "Aepvl4OKkMChgyZoEfg-OkJZravW0kRQ4qnGe2dvblr4cRypD6Bsckiql4zjKmOpkHYxc37VyIVH9Cjg" }}>
            <PayPalButtons
              style={{ layout: "vertical", color: "blue", shape: "pill", label: "paypal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: course.price.toString(),
                      },
                      description: `Enrollment in ${course.title}`,
                    },
                  ],
                });
              }}
              onApprove={handleApprove}
              onError={(err) => {
                console.error("PayPal Checkout error:", err);
                alert("Payment failed.");
              }}
            />
          </PayPalScriptProvider>
        </div>
      </form>
    </div>
  );
};

export default Enrollment;
