"use client";
import { ArrowRight, Calendar, MapPin, Sparkles, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// EventCard Component
function EventCard({
  title,
  featureImage,
  organizer,
  location,
  date,
  price,
  slug,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={featureImage}
          alt={title}
          width={100}
          height={200}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Top Actions */}

        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg">
            ৳{price}
          </div>
        </div>

        {/* Event Date */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 min-w-[80px] text-center">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            {new Date(date).toLocaleDateString("en-US", { month: "short" })}
          </div>
          <div className="text-xl font-bold text-gray-900">
            {new Date(date).getDate()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 leading-tight">
          {title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4 text-purple-500" />
            <span className="text-sm">{organizer}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{formatDate(date)}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg">
            <span className="flex items-center justify-center gap-2">
              View Details
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Main UpcomingEvents Component
export default function UpcomingEvents({ title }) {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700 font-medium">{`Don't Miss Out`}</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent leading-tight">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Events
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover amazing events happening near you. Connect, learn, and
            create unforgettable memories.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event) => (
            <EventCard
              key={event?.product_data?.id}
              title={event?.product_data?.title}
              featureImage={
                event?.images?.list?.[0]?.full_path || "/placeholder.jpg"
              }
              organizer={event?.product_data?.organized}
              location={event?.product_data?.location || "N/A"}
              date={event?.product_data?.date}
              price={event?.product_data?.price}
              slug={event?.product_data?.slug}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white shadow-lg">
            <span className="flex items-center gap-2">
              View All Events
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
