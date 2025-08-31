"use client";

import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaFacebook,
  FaLinkedinIn,
  FaPlay,
  FaTimes,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Button from "../Button";

export default function Hero({ data }) {
  const [settingData, setSettingData] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // You can customize this YouTube video ID or make it dynamic from your data
  const YOUTUBE_VIDEO_ID = data?.section_data?.video_id; // Replace with your actual video ID

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${API_BASE_URL}/api/get-req-data/settings-data`);
      const result = await res.json();
      setSettingData(result);
    }

    fetchData();
  }, [API_BASE_URL]);

  // Close video on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVideoOpen]);

  // Prevent body scroll when video is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  const banner = data?.images?.list?.find((f) => f.background === "on");

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section className="relative min-h-screen w-full flex items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 20%), 
                             radial-gradient(circle at 75% 75%, #dc2626 0%, transparent 30%)`,
            }}
          />
        </div>

        {/* Background Image with Modern Overlay */}
        {banner && (
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src={banner?.full_path}
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              priority
              className="opacity-30"
            />
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent leading-tight">
                  {parse(data?.section_data?.subtitle || "Join the Run")}
                </h1>

                {/* Subtitle with modern styling */}
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                  {parse(
                    data?.section_data?.short_desc ||
                      "Experience the thrill of running with our community"
                  )}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  path={"/fitnation-events"}
                  title="Explore Events"
                  className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                />

                {/* Secondary CTA - Watch Video Button */}
                {YOUTUBE_VIDEO_ID && (
                  <button
                    onClick={openVideo}
                    className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white/40"
                  >
                    <FaPlay className="w-4 h-4" />
                    Watch Video
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>

              {/* Stats or Description */}
              <div className="pt-8">
                <p className="text-gray-400 text-lg">
                  {parse(
                    data?.section_data?.description ||
                      "Join thousands of runners in our community events"
                  )}
                </p>
              </div>
            </div>

            {/* Right Content - Runner Avatars in Modern Grid */}
            <div className="relative">
              {data?.images?.list && data.images.list.length > 1 && (
                <div className="relative">
                  {/* Main featured image */}
                  <div className="relative w-80 h-80 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 rounded-full animate-pulse opacity-20"></div>
                    <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-red-500 rounded-full p-1">
                      <Image
                        src={
                          data.images.list[1]?.full_path ||
                          data.images.list[0]?.full_path
                        }
                        alt="Featured Runner"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>

                  {/* Floating avatar circles */}
                  {data.images.list.slice(2, 8).map((item, index) => {
                    const positions = [
                      "top-4 left-8",
                      "top-16 right-4",
                      "bottom-16 left-4",
                      "bottom-4 right-8",
                      "top-1/2 left-0",
                      "top-1/2 right-0",
                    ];

                    return (
                      <div
                        key={index}
                        className={`absolute ${positions[index]} w-16 h-16 rounded-full border-3 border-white/30 overflow-hidden backdrop-blur-sm hover:scale-110 transition-transform duration-300`}
                        style={{
                          animationDelay: `${index * 0.5}s`,
                          animation: "float 3s ease-in-out infinite",
                        }}
                      >
                        <Image
                          src={item?.full_path}
                          alt={`Runner ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}

                  {/* Decorative elements */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-full blur-xl"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modern Social Media Sidebar */}
        <aside className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-20">
          {settingData?.data?.facebook && (
            <Link
              href={settingData.data.facebook}
              className="group w-12 h-12 bg-[#1877F2]/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:w-14 hover:h-14 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebook className="w-5 h-5" />
            </Link>
          )}

          {settingData?.data?.linkedin && (
            <Link
              href={settingData.data.linkedin}
              target="_blank"
              className="group w-12 h-12 bg-[#0A66C2]/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:w-14 hover:h-14 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </Link>
          )}

          {settingData?.data?.youtube && (
            <Link
              href={settingData.data.youtube}
              target="_blank"
              className="group w-12 h-12 bg-[#FF0000]/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:w-14 hover:h-14 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="YouTube"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
          )}

          {settingData?.data?.whatsapp_number && (
            <Link
              href={`https://wa.me/${settingData.data.whatsapp_number}`}
              target="_blank"
              className="group w-12 h-12 bg-[#25D366]/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:w-14 hover:h-14 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </Link>
          )}

          {/* Vertical line decoration */}
          <div className="w-0.5 h-16 bg-gradient-to-b from-purple-500 to-red-500 mx-auto mt-4 opacity-50"></div>
        </aside>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </section>

      {/* Video Popup Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeVideo}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-4xl mx-4">
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              aria-label="Close video"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Video Container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
