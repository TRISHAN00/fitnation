"use client";

import { AlertCircle, Calendar, MapPin, Ruler } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventForm from "../../../components/event/EventForm";
import AnimatedPreloader from "../../../components/Prealoader";

export default function EventRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventsDetail, setEventDetail] = useState(null);

  const pathname = useParams();
  const searchParams = useSearchParams();
  const priceParam = searchParams.get("price");
  const kmParam = searchParams.get("km");

  let slug = pathname.events;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch Event Data
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/product-data?type=slug&value=${slug}&image=yes&post=yes&file=yes`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEventDetail(data);
      } catch (err) {
        setError("Failed to load event details. Please refresh the page.");
        console.error("Error fetching event data:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchEvents();
    }
  }, [slug, API_BASE_URL]);

  const km = eventsDetail?.data?.product_data?.km || "";
  const date = eventsDetail?.data?.product_data?.date || "";
  const location = eventsDetail?.data?.product_data?.location || "";
  const title = eventsDetail?.data?.product_data?.title || "Event";
  const short_desc = eventsDetail?.data?.product_data?.short_desc || "";
  const kmList = eventsDetail?.data?.posts?.list;

  // Error Alert Component
  const ErrorAlert = ({ message }) => (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <AnimatedPreloader />;
  }

  if (error && !eventsDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <ErrorAlert message={error} />
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white h-[40vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {short_desc && <p className="text-xl opacity-90">{short_desc}</p>}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && <ErrorAlert message={error} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Event Details
            </h2>

            <div className="space-y-4 mb-6">
              {date && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-purple-600 h-5 w-5" />
                  <div>
                    <p className="font-medium text-gray-800">Date</p>
                    <p className="text-gray-600">{date}</p>
                  </div>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="text-purple-600 h-5 w-5" />
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600">{location}</p>
                  </div>
                </div>
                )}
              {km && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Ruler className="text-purple-600 h-5 w-5" />
                  <div>
                    <p className="font-medium text-gray-800">Distance</p>
                    <p className="text-gray-600">{kmParam}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Event Registration</span>
                  <span className="font-semibold text-gray-800">
                    {priceParam} Tk
                  </span>
                </div>

                <div className="border-t pt-3 mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    {priceParam} Tk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <EventForm priceParam={priceParam} kmParam={kmParam} />
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Need help with registration?
            <a
              href="mailto:contact@fitnation.pro"
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}