"use client";

import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({
  title,
  featureImage,
  organizer,
  location,
  date,
  price,
  slug,
}) {
  return (
    <div className="group bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-700/30">
      {/* Image Container */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
        <Image
          src={featureImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
          {price} Tk
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Event Details */}
        <div className="space-y-3">
          {/* Organizer */}
          <div className="flex items-center text-gray-300 text-sm">
            <svg
              className="w-4 h-4 mr-3 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {HTMLReactParser(organizer)}
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-300 text-sm">
            <svg
              className="w-4 h-4 mr-3 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </div>

          {/* Date */}
          <div className="flex items-center text-gray-300 text-sm">
            <svg
              className="w-4 h-4 mr-3 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {date}
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href={`/fitnation-events/${slug}`}
            className="group/btn relative w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="relative z-10 flex items-center">
              View Details
              <svg
                className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5-5 5M6 12h12"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
