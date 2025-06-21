// src/pages/PaymentSuccessPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [message, setMessage] = useState("Processing payment...");
  const navigate = useNavigate();
  const location = useLocation();
  navigate("/payment-success");


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID"); // Use camelCase for consistency

    if (!paymentId || !payerId) {
      setMessage("Missing PayPal payment details.");
      return;
    }

    const executePayment = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Ensure this matches your login storage key

        const response = await fetch("http://localhost:5001/paypal/execute-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paymentId, payerId }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message || "Payment successful!");
        } else {
          setMessage(data.error || "Payment failed.");
        }
      } catch (error) {
        console.error("Error executing PayPal payment:", error);
        setMessage("An unexpected error occurred.");
      }
    };

    executePayment();
  }, [location.search]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-xl text-gray-700 text-center p-6">
      {message}
    </div>
  );
};

export default PaymentSuccessPage;
