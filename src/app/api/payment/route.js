// /api/payment/route.js - Updated version
import { NextResponse } from "next/server";
import { ShurjoPay } from "../../lib/shurjopay";

const shurjoPay = new ShurjoPay({
  baseUrl: process.env.SHURJOPAY_BASE_URL,
  username: process.env.SHURJOPAY_USERNAME,
  password: process.env.SHURJOPAY_PASSWORD,
});

export async function POST(request) {
  try {
    const formInput = await request.json();

    // Get auth token
    const response = await shurjoPay.getAuthToken();

    console.log(response, "response");

    // Generate unique order ID
    const uniqueOrderId = `sp${Date.now()}`;

    // Build payment data with proper return URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const paymentData = {
      prefix: process.env.SHURJOPAY_PREFIX,
      token: response.token,
      return_url: `${baseUrl}/payment/success`, // Your callback page
      cancel_url: `${baseUrl}/payment/cancel`, // Your cancellation page
      store_id: response.store_id,
      amount: formInput.amount,
      order_id: uniqueOrderId,
      currency: "BDT",
      customer_name: formInput.name,
      customer_address: formInput.country,
      customer_email: formInput.email,
      customer_phone: formInput.phone,
      customer_city: formInput.city || "Dhaka",
      customer_post_code: "",
      client_ip: "",

      value1: JSON.stringify({
        emergency_contact: formInput.emc,
        date_of_birth: formInput.date_of_birth,
        t_shirt_size: formInput.t_shirt_size,
        km: formInput.km,
        gender: formInput.gender,
        country: formInput.country,
      }),
    };

    // Use the checkout method from ShurjoPay class
    const paymentResponse = await shurjoPay.checkout(paymentData);

    console.log(paymentResponse, "paymentResponse");

    console.log(paymentResponse, "from payment api checkout");

    return NextResponse.json({
      success: true,
      redirectUrl: paymentResponse.checkout_url,
      orderId: paymentResponse.orderId,
      sp_order_id: paymentResponse.sp_order_id,
      amount: paymentResponse.amount,
      transactionStatus: paymentResponse.transactionStatus,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initiate payment: " + error.message,
      },
      { status: 500 }
    );
  }
}
