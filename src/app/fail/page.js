export default function FailPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-red-600">Payment Failed 😞</h1>
          <p className="mt-4 text-gray-700">Unfortunately, your payment was not successful. Please try again.</p>
          <a
            href="/ucr-events"
            className="mt-6 inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </a>
        </div>
      </div>
    );
  }
  