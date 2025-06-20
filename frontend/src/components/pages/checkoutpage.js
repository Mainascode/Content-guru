import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [loading, setLoading] = useState(false);

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600 font-medium">No book selected for checkout.</p>
      </div>
    );
  }

  const handlePayPalSuccess = async (details, data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/purchase-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.title,
          price: parseFloat(book.price.replace("$", "")),
          orderId: data.orderID,
          payerEmail: details?.payer?.email_address,
        }),
      });

      if (res.ok) {
        navigate(`/payment-success?book=${encodeURIComponent(book.title)}`);
      } else {
        alert("Payment went through, but saving failed.");
      }
    } catch (err) {
      alert("PayPal payment error");
    } finally {
      setLoading(false);
    }
  };

  const handleMpesaPayment = async () => {
    if (!mpesaNumber || mpesaNumber.length < 10) {
      alert("Enter a valid M-Pesa number");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/stk-push", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    phone: mpesaNumber, // e.g. "254712345678"
    title: book.title,
    amount: parseFloat(book.price.replace("$", ""))
  })
});

      const result = await response.json();
      if (response.ok) {
        alert("STK Push sent. Complete payment on your phone.");
        navigate(`/payment-success?book=${encodeURIComponent(book.title)}`);
      } else {
        alert(result.message || "M-Pesa payment failed.");
      }
    } catch (error) {
      alert("M-Pesa request error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Aepvl4OKkMChgyZoEfg-OkJZravW0kRQ4qnGe2dvblr4cRypD6Bsckiql4zjKmOpkHYxc37VyIVH9Cjg" }}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Checkout</h2>

          <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
            <img
              src={book.img || "/images/default-book.jpg"}
              alt={book.title}
              className="w-44 h-60 object-cover rounded-md border shadow"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-green-600 font-bold text-lg">{book.price}</p>
              <p className="text-sm text-gray-500 mt-1">Choose your preferred payment method:</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center space-x-4 mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <span className="text-gray-800 font-medium">PayPal</span>
            </label>
            <label className="flex items-center space-x-4">
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={paymentMethod === "mpesa"}
                onChange={() => setPaymentMethod("mpesa")}
              />
              <span className="text-gray-800 font-medium">M-Pesa</span>
            </label>
          </div>

          {paymentMethod === "paypal" && (
            <div>
              {loading ? (
                <p className="text-center text-gray-500">Processing PayPal payment...</p>
              ) : (
                <PayPalButtons
                  style={{ layout: "vertical", shape: "pill", label: "checkout", color: "blue" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: parseFloat(book.price.replace("$", "")).toFixed(2),
                        },
                        description: book.title,
                      }],
                    });
                  }}
                  onApprove={(data, actions) =>
                    actions.order.capture().then((details) =>
                      handlePayPalSuccess(details, data)
                    )
                  }
                  onError={(err) => {
                    console.error("PayPal error:", err);
                    alert("PayPal checkout failed. Try again.");
                  }}
                />
              )}
            </div>
          )}

          {paymentMethod === "mpesa" && (
            <div className="mt-4">
              <label className="block mb-1 font-medium text-gray-700">M-Pesa Number</label>
              <input
                type="tel"
                placeholder="e.g. 0712345678"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleMpesaPayment}
                disabled={loading}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                {loading ? "Sending STK Push..." : "Pay with M-Pesa"}
              </button>
            </div>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
