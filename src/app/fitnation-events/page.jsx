"use client";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import InnerBanner from "../components/InnerBanner";
import AnimatedPreloader from "../components/Prealoader";

export default function FitnationEvents() {
  const [eventsData, seteventsData] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // Call both APIs simultaneously
        const [eventsRes, bannerRes] = await Promise.all([
          fetch(
            `${API_BASE_URL}/get-req-data/all-products?image=yes&post=no&file=&specification=&gallery=&variation=&limit=`
          ),
          fetch(
            `${API_BASE_URL}/get-req-data/sections?type=slug&value=events&get_section=yes&image=yes&post=no&file=no&gallery=no`
          ),
        ]);

        const eventsResult = await eventsRes.json();
        const bannerResult = await bannerRes.json();

        seteventsData(eventsResult);
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
    (f) => f?.section_data?.slug === "event-banner"
  );

  const bannerImg = innerBanner?.images?.list?.find((f) => f.banner === "on");

  return (
    <>
      <InnerBanner
        title={innerBanner?.section_data?.subtitle}
        img={bannerImg?.full_path}
      />

      <section className="py-32  md:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsData?.data?.map(({ product_data, images }) => {
            const thumb = images?.list?.find((f) => f.thumb === "on");
            return (
              <EventCard
                key={product_data.id}
                title={product_data.title}
                featureImage={thumb?.full_path}
                organizer={product_data?.organized}
                location={product_data?.location || "N/A"}
                date={product_data?.date}
                price={product_data?.price}
                slug={product_data.slug}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
