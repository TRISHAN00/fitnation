"use client";
import { useEffect, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import AnimatedPreloader from "../components/Prealoader";
import Info from "../components/contact/Info";
import JoinInfo from "../components/contact/JoinInfo";

export default function ContactUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=contact-us&get_section=yes&image=yes&post=yes&file=no&gallery=no`
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

  const innerBanner = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "contact-us-banner"
  );

  const info = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "contact-info"
  );

  const joinUs = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "contact-join-us"
  );

  if (loading) {
    return <AnimatedPreloader />;
  }

  return (
    <>
      <InnerBanner
        title={innerBanner?.section_data?.subtitle}
        img={innerBanner?.images?.list?.[0]?.full_path}
      />
       <Info info={info} />
      
      <JoinInfo data={joinUs} />
    </>
  );
}
