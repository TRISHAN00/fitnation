"use client";

import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    if (!orderId) {
      setLoading(false);
      return;
    }
    verifyPayment(orderId);
  }, [searchParams]);

  const verifyPayment = async (orderId) => {
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      });

      if (!res.ok)
        throw new Error(`Payment verification failed: ${res.status}`);
      const data = await res.json();
      setVerification(data);

      let parsed = {};
      if (data.value1) {
        try {
          parsed = JSON.parse(data.value1);
          setAdditionalData(parsed);
        } catch (err) {
          console.error("JSON parse error:", err);
        }
      }

      // 1️⃣ Send confirmation email
      // try {
      //   await fetch("/api/mail", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       email: data.email,
      //       name: data.name,
      //       orderId: data.order_id,
      //       amount: data.amount,
      //     }),
      //   });
      //   console.log("✅ Confirmation email sent");
      // } catch (mailError) {
      //   console.error("❌ Email sending failed:", mailError);
      // }

      // 2️⃣ Send SMS via server-side route
      // try {
      //   await fetch("/api/send-sms", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       phone: data.phone_no,
      //       message:
      //         "Congratulations for Your Successful Registration. Let's make history together! Team IBHM2025",
      //     }),
      //   });
      // } catch (smsError) {
      //   console.error("❌ SMS sending failed:", smsError);
      // }

      // 3️⃣ Submit form to CMS
      try {
        const formData = new FormData();
        formData.append("form_id", "event-form");
        formData.append("name", data.name || "");
        formData.append("email", data.email || "");
        formData.append("phone", data.phone_no || "");
        formData.append("amount", data.amount || "");
        formData.append("order_id", data.order_id || "");
        formData.append("full_address", parsed.full_address || "");
        formData.append("country", parsed.country || "");
        formData.append("organization", parsed.organization || "");
        formData.append("position", parsed.position || "");
        formData.append("date_of_birth", parsed.date_of_birth || "");
        formData.append("t_shirt_size", parsed.t_shirt_size || "");
        formData.append("km", parsed.km || "");
        formData.append("gender", parsed.gender || "");
        formData.append("nid", parsed.nid || "");
        formData.append("emc", parsed.emc || "");

        const formRes = await fetch(
          "https://cms.fitnation.pro/api/post-req-data/form-submit",
          { method: "POST", body: formData }
        );

        if (!formRes.ok) {
          const errText = await formRes.text();
          console.error("Form submission failed:", errText);
        } else console.log("✅ Form submitted successfully");
      } catch (formError) {
        console.error("❌ Form submission error:", formError);
      }
    } catch (err) {
      console.error("❌ Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center p-8 min-h-screen flex items-center justify-center">
        Verifying payment...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6 animate-fadeIn text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce mx-auto">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-purple-200 text-lg">
            Thank you for your registration. Your spot is confirmed!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
