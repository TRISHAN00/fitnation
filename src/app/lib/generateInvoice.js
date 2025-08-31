import fs from "fs";
import jsPDF from "jspdf";

const file = fs.readFileSync("./public/logo.png");
const base64 = file.toString("base64");
console.log("data:image/png;base64," + base64);

export const generateInvoicePDF = (verification, additionalData) => {
  const doc = new jsPDF("p", "mm", "a4");

  // Add company logo
  const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // your base64 string
  doc.addImage(logoBase64, "PNG", 10, 10, 40, 20);

  doc.addImage(logo, "PNG", 10, 10, 40, 20);

  // Invoice title
  doc.setFontSize(18);
  doc.text("Invoice", 150, 20);

  doc.setFontSize(12);
  doc.text(`Invoice No: ${verification.invoice_no}`, 150, 28);
  doc.text(`Date: ${verification.date_time}`, 150, 34);

  // Customer info
  doc.setFontSize(14);
  doc.text("Billing To:", 10, 50);
  doc.setFontSize(12);
  doc.text(`${verification.name}`, 10, 56);
  doc.text(`${verification.email}`, 10, 62);
  doc.text(`${verification.phone_no}`, 10, 68);
  doc.text(`${verification.address}, ${verification.city}`, 10, 74);

  if (additionalData?.organization) {
    doc.text(`${additionalData.organization}`, 10, 80);
  }

  // Payment info table
  doc.setFontSize(14);
  doc.text("Payment Details", 10, 95);
  doc.setFontSize(12);

  const startY = 100;
  const lineHeight = 8;
  let y = startY;

  const details = [
    ["Order ID", verification.order_id],
    ["Invoice No", verification.invoice_no],
    ["Bank Txn ID", verification.bank_trx_id],
    ["Amount", `${verification.amount} ${verification.currency}`],
    ["Payable Amount", verification.payable_amount],
    ["Received Amount", verification.received_amount],
    ["Payment Method", verification.method],
    ["Status", verification.bank_status],
  ];

  details.forEach(([label, value]) => {
    doc.text(`${label}:`, 10, y);
    doc.text(`${value}`, 60, y);
    y += lineHeight;
  });

  // Registration info
  if (additionalData) {
    y += 5;
    doc.setFontSize(14);
    doc.text("Registration Details", 10, y);
    y += lineHeight;
    doc.setFontSize(12);

    const regDetails = [
      ["T-shirt Size", additionalData.t_shirt_size],
      ["Distance", additionalData.km],
      ["Gender", additionalData.gender],
      ["Position", additionalData.position || ""],
      ["DOB", additionalData.date_of_birth || ""],
      ["NID", additionalData.nid || ""],
    ];

    regDetails.forEach(([label, value]) => {
      if (value) {
        doc.text(`${label}:`, 10, y);
        doc.text(`${value}`, 60, y);
        y += lineHeight;
      }
    });
  }

  // Footer
  doc.setFontSize(10);
  doc.text(
    "Thank you for your registration! Keep this invoice for your records.",
    10,
    280
  );

  doc.save(`${verification.invoice_no || "invoice"}.pdf`);
};
