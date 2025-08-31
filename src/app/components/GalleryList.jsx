"use client";

import { Eye } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

// Dynamically import LightGallery (disable SSR)
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function GalleryList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=gallery&get_section=yes&image=yes&post=yes&file=no&gallery=no`
        );
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_BASE_URL]);

  const galleyImages = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "gallery-items"
  );

  // ✅ Safe fallback for undefined
  const images = galleyImages?.images?.list || [];

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  // 🔹 State for pagination
  const [visibleCount, setVisibleCount] = useState(20);

  // 🔹 Load More function
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading gallery...</p>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No images found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col items-center px-6 py-12">
      {/* LightGallery */}
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full"
      >
        {images.slice(0, visibleCount).map((img, idx) => (
          <a
            key={idx}
            href={img?.full_path}
            className="group relative block overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              alt={`Gallery Image ${idx + 1}`}
              src={img?.full_path}
              width={700}
              height={500}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Eye className="w-10 h-10 text-white" />
            </div>
          </a>
        ))}
      </LightGallery>

      {/* Load More Button */}
      {visibleCount < images.length && (
        <button
          onClick={handleLoadMore}
          className="mt-10 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  );
}
