import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [loading, setLoading] = useState(false);

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-yellow-50 px-4">
        <p className="text-xl font-medium text-red-600">No book selected for checkout.</p>
      </div>
    );
  }

  const handlePayPalSuccess = async (details, data) => {
    setLoading(true);
    try {
      const res = await fetch("https://content-guru-gpls.onrender.com/purchase-book", {
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
        alert("Payment processed, but saving failed.");
      }
    } catch (err) {
      alert("PayPal payment error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <PayPalScriptProvider options={{ "client-id": "AZN2oJYE9WSgARkZ3cWh8CMcK8wJ53l-gX7UaIUtE3Yvl8QZ5-OfLPhRUObcYNVV32GGKRb6a6gj14OS" }}>
<div className="max-w-3xl mx-auto px-4 py-16">
  <div className="bg-white rounded-lg shadow-md p-8">
    <h2 className="text-3xl font-extrabold text-center text-yellow-900 mb-8">
      Checkout
    </h2>

    <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
      <img
        src={book.img || "/images/default-book.jpg"}
        alt={book.title}
        className="w-44 h-60 object-cover rounded shadow"
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-semibold text-yellow-800">{book.title}</h3>
        <p className="text-lg font-bold text-green-700">{book.price}</p>
        <p className="text-sm text-gray-700 mt-2">
          Choose your preferred payment method:
        </p>
      </div>
    </div>

    {/* payment method radio buttons */}
    <div className="mb-6">
      <label className="flex items-center space-x-3 mb-2">
        <input
          type="radio"
          name="paymentMethod"
          value="paypal"
          checked={paymentMethod === "paypal"}
          onChange={() => setPaymentMethod("paypal")}
        />
        <span className="text-yellow-800 font-medium">PayPal</span>
      </label>
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="paymentMethod"
          value="mpesa"
          checked={paymentMethod === "mpesa"}
          onChange={() => setPaymentMethod("mpesa")}
        />
        <span className="text-yellow-800 font-medium">M-Pesa</span>
      </label>
    </div>

    {/* PayPal */}
    {paymentMethod === "paypal" && (
      <div>
        {loading ? (
          <p className="text-center text-gray-700">Processing PayPal payment...</p>
        ) : (
          <PayPalButtons
            disabled={loading}
            style={{
              layout: "vertical",
              shape: "pill",
              label: "checkout",
              color: "gold",
            }}
            createOrder={(data, actions) =>
              actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: parseFloat(book.price.replace("$", "")).toFixed(2),
                    },
                    description: book.title,
                  },
                ],
              })
            }
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


  </div>
</div>

    </PayPalScriptProvider>
  );
}
