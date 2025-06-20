import { useState } from "react";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PhoneSignup = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => console.log("reCAPTCHA solved"),
      },
      auth
    );
  };

  const sendOTP = async () => {
    setError("");
    setupRecaptcha();
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Make sure the phone number is valid.");
    }
  };

  const verifyOTP = async () => {
    setError("");
    try {
      const result = await confirmationResult.confirm(otp);
      const token = await result.user.getIdToken();

      // Send token to backend to register/login user
      const res = await fetch("http://localhost:5001/firebase-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Signup failed.");
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold text-center mb-4">Phone Sign-Up</h2>

        {!confirmationResult ? (
          <>
            <input
              type="tel"
              placeholder="+254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={sendOTP}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={verifyOTP}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default PhoneSignup;
