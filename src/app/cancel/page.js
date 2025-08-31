export default function CancelPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-yellow-600">Payment Canceled ⚠️</h1>
          <p className="mt-4 text-gray-700">You have canceled your payment. If this was a mistake, you can try again.</p>
          <a
            href="/ucr-events"
            className="mt-6 inline-block px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Retry Payment
          </a>
        </div>
      </div>
    );
  }
  