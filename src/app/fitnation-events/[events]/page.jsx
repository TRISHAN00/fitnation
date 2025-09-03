/* eslint-disable @next/next/no-img-element */
"use client";
import parse from "html-react-parser";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RegistrationCard from "../../components/event/RegistrationCard";
import AnimatedPreloader from "../../components/Prealoader";

export default function EventPage() {
  const [loading, setLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedKm, setSelectedKm] = useState(0);
  const [error, setError] = useState(null);
  const [eventsDetail, setEventDetail] = useState();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showImportantNotes, setShowImportantNotes] = useState(false);
  const path = useParams();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/product-data?type=slug&value=${path.events}&image=yes&post=yes&file=yes`
        );
        const data = await response.json();
        setEventDetail(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [path.events, API_BASE_URL]);

  const date = eventsDetail?.data?.product_data?.date;
  const location = eventsDetail?.data?.product_data?.location;

  const features = eventsDetail?.data?.images?.list?.filter(
    (f) => f?.feature === "on"
  );
  const importantNotes = eventsDetail?.data?.posts?.list?.find(
    (f) => f?.data?.slug === "important-notes"
  );

  const handleSelectPrice = (price, km) => {
    setSelectedPrice(price);
    setSelectedKm(km);
  };

  if (loading) {
    return <AnimatedPreloader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
          {eventsDetail?.data?.images?.list?.find((f) => f?.banner === "on")
            ?.full_path && (
            <Image
              src={
                eventsDetail.data.images.list.find((f) => f?.banner === "on")
                  ?.full_path
              }
              alt="Event Image"
              fill
              className="object-fill"
              priority
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-slate-900/80 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-4xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
                  {eventsDetail?.data?.product_data?.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center text-white/90 space-y-2 sm:space-y-0 sm:space-x-6 text-sm sm:text-base">
                  {eventsDetail?.data?.product_data?.organized && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {eventsDetail?.data?.product_data?.organized}
                      </span>
                    </div>
                  )}

                  {location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                      <span className="truncate">{location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6 lg:space-y-8">
              {/* Registration Cards */}
              <div className="bg-slate-800 rounded-xl shadow-lg border border-purple-700/30 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                  Select Registration Category
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {eventsDetail?.data?.posts?.list?.map((item, index) => (
                    <RegistrationCard
                      key={index}
                      title={item?.data?.title}
                      price={item?.data?.subtitle}
                      selectedPrice={selectedPrice}
                      selectedKm={selectedKm}
                      onSelectPrice={handleSelectPrice}
                    />
                  ))}
                </div>

                {selectedPrice === 0 && (
                  <div className="mt-4 p-3 sm:p-4 bg-purple-900/50 border border-purple-500/30 rounded-lg">
                    <p className="text-purple-200 font-medium text-sm sm:text-base flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                      Please select a registration category before proceeding to
                      checkout.
                    </p>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <section className="bg-slate-800 rounded-xl shadow-lg border border-purple-700/30 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                  Event Details
                </h2>

                {eventsDetail?.data?.product_data?.short_desc && (
                  <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                    {eventsDetail?.data?.product_data?.short_desc}
                  </p>
                )}

                <div className="space-y-4">
                  {date && (
                    <div className="flex items-start text-gray-300">
                      <Calendar className="h-5 w-5 mr-3 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">Date</p>
                        <p className="text-sm sm:text-base">{date}</p>
                      </div>
                    </div>
                  )}

                  {eventsDetail?.data?.product_data?.description && (
                    <div className="flex items-start text-gray-300">
                      <Clock className="h-5 w-5 mr-3 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base mb-2">
                          Cut-off Times
                        </p>
                        <div className="text-sm sm:text-base prose prose-sm max-w-none prose-invert">
                          {parse(eventsDetail?.data?.product_data?.description)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* What You'll Get */}
              {features?.length > 0 && (
                <section className="bg-slate-800 rounded-xl shadow-lg border border-purple-700/30 p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    What You&apos;ll Get
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features?.map((feature, index) => (
                      <div
                        key={index + 1}
                        className="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors group"
                      >
                        <img
                          className="h-12 w-12 sm:h-16 sm:w-16 object-contain mb-3 group-hover:scale-105 transition-transform"
                          src={feature?.full_path}
                          alt={feature?.short_title}
                        />
                        <h3 className="font-semibold text-white text-center text-sm sm:text-base">
                          {feature?.short_title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 text-center mt-2 leading-relaxed">
                          {feature?.short_desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Distance Selection */}
              {selectedPrice > 0 && (
                <div className="bg-slate-800 rounded-xl shadow-lg border border-purple-700/30 p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    Select Your Distance
                  </h2>
                  <div className="space-y-4">
                    <div className="border-2 border-purple-600/30 rounded-lg p-4 hover:border-purple-500 transition-colors group bg-gradient-to-r from-slate-700 to-slate-600">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        {eventsDetail?.data?.product_data?.km && (
                          <h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-purple-300">
                            {selectedKm}
                          </h3>
                        )}
                        {selectedPrice && (
                          <span className="text-white font-bold text-xl sm:text-2xl">
                            ৳ {selectedPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-300 mb-4">
                        Challenge yourself with this distance.
                      </p>

                      <Link
                        href={`/fitnation-events/${path.events}/checkout?price=${selectedPrice}&km=${selectedKm}`}
                        className="block"
                      >
                        <button
                          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={selectedPrice === 0}
                        >
                          Proceed to Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Notes */}
              {importantNotes?.data?.description && (
                <div className="bg-slate-800 rounded-xl shadow-lg border border-purple-700/30 p-4 sm:p-6">
                  <button
                    onClick={() => setShowImportantNotes(!showImportantNotes)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-purple-400" />
                      Important Notes
                    </h2>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform lg:hidden ${
                        showImportantNotes ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`mt-4 prose prose-sm max-w-none text-gray-300 prose-invert ${
                      showImportantNotes ? "block" : "hidden lg:block"
                    }`}
                  >
                    {parse(importantNotes?.data?.description)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Checkout Button for Mobile */}
        {selectedPrice > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-800 border-t border-purple-700/30 lg:hidden z-50">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-300">
                  Selected: {selectedKm} KM
                </p>
                <p className="font-bold text-white">
                  ৳ {selectedPrice.toLocaleString()}
                </p>
              </div>
              <Link
                href={`/fitnation-events/${path.events}/checkout?price=${selectedPrice}&km=${selectedKm}`}
              >
                <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
