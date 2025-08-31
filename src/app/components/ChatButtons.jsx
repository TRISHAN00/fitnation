"use client";

import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

export default function ChatButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/8801755882225" // change phone number
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/fitnation.pro" // change page username
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-transform transform hover:scale-110"
        aria-label="Chat on Messenger"
      >
        <FaFacebookMessenger className="text-2xl" />
      </a>
    </div>
  );
}
