export async function POST(req) {
  try {
    const { phone, message } = await req.json();

    // Format phone number
    let formattedPhone = phone.startsWith("+") ? phone.slice(1) : phone;
    if (!formattedPhone.startsWith("88"))
      formattedPhone = `88${formattedPhone}`;

    const smsUrl = `http://45.120.38.242/api/sendsms?api_key=01755882225.imG4vZbVu2u8PUdOoG&type=text&phone=${formattedPhone}&senderid=8809604903051&message=${encodeURIComponent(
      message
    )}`;

    const response = await fetch(smsUrl);
    const text = await response.text();

    return new Response(JSON.stringify({ success: true, text }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
