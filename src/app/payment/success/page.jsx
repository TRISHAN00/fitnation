"use client";
import { useEffect, useRef, useState } from "react";

export default function PaymentCallback() {
  const [verificationStatus, setVerificationStatus] = useState("loading"); // loading | verifying | success | failed | error
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);


  // Prevent multiple SMS/email sends
  const notificationsSent = useRef(false);

  // Extract URL parameters
  const getUrlParameter = (name) => {
    if (typeof window === "undefined") return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  useEffect(() => {
    const orderIdFromUrl =
      getUrlParameter("order_id") || getUrlParameter("sp_order_id");

    if (!orderIdFromUrl) {
      setError("We could not detect your order ID.");
      setVerificationStatus("error");
      return;
    }

    setOrderId(orderIdFromUrl);
    verifyPayment(orderIdFromUrl);
  }, []);

  const verifyPayment = async (orderIdToVerify) => {
    try {
      setVerificationStatus("verifying");

      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderIdToVerify }),
      });

      const result = await response.json();
      console.log("Verify API Result:", result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to verify your payment at this time."
        );
      }

      setPaymentData(result.verification);

      if (
        result.verification.sp_code === "1000" &&
        !notificationsSent.current
      ) {
        setVerificationStatus("success");

        // Mark notifications as sent
        notificationsSent.current = true;

        // Send SMS
        // fetch(`/api/send-sms`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     phone: result.verification.phone_no,
        //     message: `IBHM 2025: Your registration is confirmed! Congratulations on your successful registration — together, let’s make history! See you at the starting line, Team IBHM 2025`,
        //   }),
        // }).catch((err) => console.error("SMS sending failed:", err));

        // Send Email
        // fetch(`/api/mail`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: result.verification.value2,
        //     name: result.verification.name,
        //     orderId: result.verification.customer_order_id,
        //     amount: result.verification.amount,
        //   }),
        // }).catch((err) => console.error("Email sending failed:", err));
      } else if (result.verification.sp_code !== "1000") {
        setVerificationStatus("failed");
        setError("Payment verification failed.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message);
      setVerificationStatus("error");
    }
  };

  const StatusIcon = () => {
    switch (verificationStatus) {
      case "loading":
      case "verifying":
        return (
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        );
      case "success":
        return (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "failed":
      case "error":
        return (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <StatusIcon />

        {verificationStatus === "loading" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Your Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your transaction.
            </p>
          </>
        )}

        {verificationStatus === "verifying" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600">
              Confirming your transaction details...
            </p>
          </>
        )}

        {verificationStatus === "success" && paymentData && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you! Your payment has been confirmed.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-2">Transaction Details</h3>
              <p className="text-sm">
                <strong>Order ID:</strong> {paymentData.customer_order_id}
              </p>
              <p className="text-sm">
                <strong>Amount:</strong> ৳{paymentData.amount}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {paymentData.bank_status}
              </p>
              <p className="text-sm">
                <strong>Payment Method:</strong> {paymentData.method}
              </p>
              <p className="text-sm">
                <strong>Name:</strong> {paymentData.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {paymentData.email || "N/A"}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {paymentData.phone_no}
              </p>
              <p className="text-sm">
                <strong>Address:</strong> {paymentData.address},{" "}
                {paymentData.city}
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Return to Home
            </button>
          </>
        )}

        {(verificationStatus === "failed" ||
          verificationStatus === "error") && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              {verificationStatus === "failed"
                ? "Payment Failed"
                : "Verification Error"}
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-3">
              <button
                onClick={() => verifyPayment(orderId)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Retry Verification
              </button>
              <button
                onClick={() => (window.location.href = "/fitnation-events")}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Go to Events
              </button>
            </div>
          </>
        )}

        {orderId && (
          <div className="mt-6 text-xs text-gray-500">
            Reference Order ID: {orderId}
          </div>
        )}
      </div>
    </div>
  );
}
