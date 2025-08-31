import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, orderId, amount } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // set true if port is 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fitnation" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "✅ Payment Confirmation - Fitnation",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2>Hi ${name},</h2>
          <p>We have received your payment successfully.</p>

          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Amount Paid:</strong> ${amount} BDT</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

          <p>
            <strong>Inspiring Bangladesh</strong> proudly announces the 
            <strong>Inspiring Bangladesh Half Marathon 2025</strong>, 
            an official <strong>Member of The Association of International Marathons and Distance Races (AIMS)</strong> 
            with a <strong>World Athletics Certified Measured Course</strong>, in cooperation with AIMS.
          </p>

          <p>
            🔗 Official Link: 
            <a href="https://aims-worldrunning.org/races/10477.html" target="_blank">
              https://aims-worldrunning.org/races/10477.html
            </a>
          </p>

          <p>
            🎥 YouTube Link: 
            <a href="https://www.youtube.com/watch?v=0SIQs9gcjRE" target="_blank">
              Watch Here
            </a>
          </p>

          <p>We appreciate your support and look forward to seeing you at the event! 💪</p>

          <p style="margin-top: 30px;">Warm Regards,<br/>Team IBHM2025</p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

          <h3>Stay Connected:</h3>
          <ul style="padding-left: 20px;">
            <li>
              📌 Join Facebook Group: 
              <a href="https://www.facebook.com/groups/fitnationrunnersunited" target="_blank">
                Fitnation Runners United
              </a>
            </li>
            <li>
              👍 Join Facebook: 
              <a href="https://www.facebook.com/fitnation.pro" target="_blank">
                Fitnation
              </a>
            </li>
            <li>
              🌍 Inspiring Bangladesh Facebook: 
              <a href="https://www.facebook.com/ibangladesh1971" target="_blank">
                I Bangladesh
              </a>
            </li>
            <li>
              💬 Follow us on WhatsApp: 
              <a href="https://whatsapp.com/channel/0029VaitCoL30LKH46EdQ03I" target="_blank">
                Inspiring Bangladesh Channel
              </a>
            </li>
          </ul>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Mail error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
