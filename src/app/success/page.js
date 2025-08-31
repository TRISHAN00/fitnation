"use client";
export default function SuccessPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
          <p className="mt-4 text-gray-700">Thank you for your payment! Your transaction was successful.</p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
  