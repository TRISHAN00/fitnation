import { NextResponse } from 'next/server';
import { shurjoPay } from '../../utils/shurjopay-config';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Generate unique order ID
    const orderId = `sp${Date.now()}`;
    
    // Get client IP
    const clientIp = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';

    // Prepare payment data for shurjoPay
    const paymentData = {
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
      amount: parseFloat(formData.amount),
      order_id: orderId,
      currency: 'BDT',
      customer_name: formData.name,
      customer_address: formData.full_address || 'Dhaka',
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_city: 'Dhaka', // You can extract from address if needed
      customer_post_code: '1000',
      client_ip: clientIp,
      customer_country: formData.country || 'BD',
      // Store additional form data in value fields
      value1: JSON.stringify({
        emc: formData.emc,
        organization: formData.organization,
        position: formData.position,
        nid: formData.nid,
        date_of_birth: formData.date_of_birth,
        full_address: formData.full_address,
        country: formData.country,
        t_shirt_size: formData.t_shirt_size,
        km: formData.km,
        gender: formData.gender,
        payment_method: formData.payment_method
      }),
      value2: orderId, // Store our order reference
    };

    // Validate required fields
    const requiredFields = ['customer_name', 'customer_email', 'customer_phone', 'amount'];
    for (const field of requiredFields) {
      if (!paymentData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: Save registration data to your database here with orderId as reference
    // Example:
    // await saveRegistration({ ...formData, orderId, status: 'pending' });

    const paymentResponse = await shurjoPay.initiatePayment(paymentData);
    
    return NextResponse.json({
      redirectUrl: paymentResponse.checkout_url,
      orderId: orderId,
      sp_order_id: paymentResponse.sp_order_id
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment: ' + error.message },
      { status: 500 }
    );
  }
}