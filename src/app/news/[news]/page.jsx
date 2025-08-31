"use client";

import parse from "html-react-parser";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedPreloader from "../../components/Prealoader";

export default function BlogDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogDetail, setBlogDetail] = useState();
  const params = useParams();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-req-data/blog-data?type=slug&value=${params.news}`
        );
        const data = await response.json();
        console.log("Fetched Data:", data);
        setBlogDetail(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    if (params?.news) {
      fetchBlogs();
    }
  }, [API_BASE_URL, params?.news]);

  const title = blogDetail?.data?.data?.subtitle;
  const body = blogDetail?.data?.data?.body;
  const banners = blogDetail?.data?.images?.list || [];

  const rawDate = blogDetail?.data?.data?.date;

  // Convert Date Format
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (loading) return <AnimatedPreloader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 pt-[120px] pb-[120px] ">
      <div className="max-w-[1300px] mx-auto w-full bg-white p-6 rounded-lg shadow-md">
        {/* Blog Title */}
        {title && (
          <h1 className="text-3xl font-bold text-gray-900">
            {parse(title || "")}
          </h1>
        )}

        {/* Blog Meta */}
        <div className="flex items-center space-x-4 text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <p>{formattedDate}</p>
          </div>
        </div>

        {/* Blog Image */}
        {banners.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((img, idx) => (
              <div key={idx} className="relative w-full h-64">
                <Image
                  src={img.full_path}
                  alt={`${title || "Blog Image"} ${idx + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Blog Content */}
        <div className="mt-6 text-gray-700 space-y-5">{parse(body || "")}</div>
      </div>
    </div>
  );
}
