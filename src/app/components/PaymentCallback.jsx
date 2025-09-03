"use client";
import { useEffect, useState } from "react";

export default function PaymentCallback() {
  const [verificationStatus, setVerificationStatus] = useState("loading");
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // Function to get URL parameters
  const getUrlParameter = (name) => {
    if (typeof window === "undefined") return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  useEffect(() => {
    // Get order ID from URL parameters
    const orderIdFromUrl = getUrlParameter("order_id") || getUrlParameter("sp_order_id");
    setOrderId(orderIdFromUrl);
    
    if (!orderIdFromUrl) {
      setError("No order ID found in URL");
      setVerificationStatus("error");
      return;
    }

    verifyPayment(orderIdFromUrl);
  }, []);

  const verifyPayment = async (orderIdToVerify) => {
    try {
      setVerificationStatus("verifying");
      
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderIdToVerify,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Verification failed");
      }

      if (result.success) {
        setPaymentData(result.verification);
        
        // Check payment status from verification response
        const paymentStatus = result.verification?.sp_code;
        if (paymentStatus === "1000") {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("failed");
        }
      } else {
        setVerificationStatus("failed");
        setError(result.error || "Payment verification failed");
      }
      
    } catch (error) {
      console.error("Verification error:", error);
      setError(error.message);
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
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "failed":
      case "error":
        return (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing...</h2>
            <p className="text-gray-600">Please wait while we verify your payment.</p>
          </>
        )}
        
        {verificationStatus === "verifying" && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Confirming your transaction...</p>
          </>
        )}
        
        {verificationStatus === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your payment has been confirmed.</p>
            {paymentData && (
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold mb-2">Transaction Details:</h3>
                <p className="text-sm"><strong>Order ID:</strong> {paymentData.customer_order_id || orderId}</p>
                <p className="text-sm"><strong>Amount:</strong> ৳{paymentData.amount}</p>
                <p className="text-sm"><strong>Status:</strong> {paymentData.bank_status || "Completed"}</p>
                {paymentData.method && <p className="text-sm"><strong>Method:</strong> {paymentData.method}</p>}
              </div>
            )}
            <button
              onClick={() => window.location.href = "/"}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Continue to Home
            </button>
          </>
        )}
        
        {(verificationStatus === "failed" || verificationStatus === "error") && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              {verificationStatus === "failed" ? "Payment Failed" : "Verification Error"}
            </h2>
            <p className="text-gray-600 mb-4">
              {error || "There was an issue with your payment. Please try again."}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => verifyPayment(orderId)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Retry Verification
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Go to Home
              </button>
            </div>
          </>
        )}
        
        {orderId && (
          <div className="mt-6 text-xs text-gray-500">
            Order ID: {orderId}
          </div>
        )}
      </div>
    </div>
  );
}