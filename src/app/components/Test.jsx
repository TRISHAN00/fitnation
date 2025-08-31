"use client";
import { useState } from "react";

export default function PayButton() {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    const res = await fetch("/api/payment/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 500,
        orderId: "order123",
        customerName: "Trishan Saha",
        customerPhone: "017XXXXXXXX",
      }),
    });

    const data = await res.json();
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl; // Redirect to ShurjoPay
    } else {
      alert("Payment initiation failed!");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading ? "Redirecting..." : "Pay Now"}
    </button>
  );
}
