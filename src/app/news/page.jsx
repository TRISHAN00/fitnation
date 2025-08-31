"use client";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import InnerBanner from "../components/InnerBanner";
import AnimatedPreloader from "../components/Prealoader";

export default function Blog() {
  const [newsData, setnewsData] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // Call both APIs simultaneously
        const [newsRes, bannerRes] = await Promise.all([
          fetch(
            `${API_BASE_URL}/get-req-data/blog-list?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`
          ),
          fetch(
            `${API_BASE_URL}/get-req-data/sections?type=slug&value=news&get_section=yes&image=yes&post=no&file=no&gallery=no`
          ),
        ]);

        const newsResult = await newsRes.json();
        const bannerResult = await bannerRes.json();

        setnewsData(newsResult);
        setBannerData(bannerResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_BASE_URL]);

  if (loading) {
    return <AnimatedPreloader />;
  }

  const innerBanner = bannerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "news-banner"
  );

  const bannerImg = innerBanner?.images?.list?.find((f) => f.banner === "on");

  return (
    <>
      <InnerBanner
        title={innerBanner?.section_data?.subtitle}
        img={bannerImg?.full_path}
      />

      <section className="py-32 px-4 md:px-6 lg:px-8 pt-[120px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData?.data?.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
