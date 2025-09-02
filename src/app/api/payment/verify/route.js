import { NextResponse } from 'next/server';
import { shurjoPay } from '../../../utils/shurjopay-config';

export async function POST(request) {
  try {
    const { order_id } = await request.json();

    console.log(order_id)

    console.log(order_id)
    
    if (!order_id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const verification = await shurjoPay.verifyPayment(order_id);
    
    // TODO: Update registration status in your database
    // const registrationData = JSON.parse(verification[0].value1);
    // await updateRegistrationStatus(verification[0].value2, verification[0].sp_code === '1000' ? 'completed' : 'failed');
    
    return NextResponse.json(verification[0]);
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment: ' + error.message },
      { status: 500 }
    );
  }
}