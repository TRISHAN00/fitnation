"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import GalleryList from "../GalleryList";

export default function GallerySection({ data }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const images = data?.images?.list;

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #dc2626 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-red-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm mb-6">
            <FaCamera className="mr-2" />
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
            Our Moments
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent leading-tight mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Capture the moments, celebrate the journey. Every photo tells a
            story of passion, dedication, and community.
          </p>
        </div>

       <GalleryList/>
      </div>

    
    </section>
  );
}
