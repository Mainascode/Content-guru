// src/pages/PaymentSuccessPage.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [message, setMessage] = useState("Processing payment...");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    if (!paymentId || !payerId) {
      setMessage(" Missing PayPal payment details.");
      return;
    }

    const executePayment = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const response = await fetch("https://content-guru-gpls.onrender.com/paypal/execute-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paymentId, payerId }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message || " Payment successful! Thank you for enrolling.");
        } else {
          setMessage(data.error || " Payment failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error executing PayPal payment:", error);
        setMessage("⚠️ An unexpected error occurred. Please try again.");
      }
    };

    executePayment();
  }, [location.search]);

return (
  <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-6">
    <div className="bg-white p-8 rounded shadow text-yellow-800 text-xl text-center">
      {message}
    </div>
  </div>
);
};

export default PaymentSuccessPage;
