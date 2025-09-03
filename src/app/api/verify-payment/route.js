// /api/verify-payment/route.js
import { NextResponse } from "next/server";
import { ShurjoPay } from "../../lib/shurjopay";

const shurjoPay = new ShurjoPay({
  baseUrl: process.env.SHURJOPAY_BASE_URL,
  username: process.env.SHURJOPAY_USERNAME,
  password: process.env.SHURJOPAY_PASSWORD,
});
export async function POST(request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Call verifyPayment
    const tokenResponse = await shurjoPay.verifyPayment(order_id);

    // ✅ Make sure we unwrap array response
    const verificationData = Array.isArray(tokenResponse)
      ? tokenResponse[0]
      : tokenResponse;

    console.log(verificationData);

    return NextResponse.json({
      success: true,
      verification: verificationData,
      message: "Payment verification completed",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify payment: " + error.message,
      },
      { status: 500 }
    );
  }
}
