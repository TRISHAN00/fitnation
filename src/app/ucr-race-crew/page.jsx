"use client";
import { useEffect, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import TeamSection from "../components/ucrCrew/TeamSection";



export default function UCRRaceCrew() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=ucr-race-crew&get_section=yes&image=yes&post=yes&file=no&gallery=no`
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C02130] rounded-full animate-spin"></div>
      </div>
    );
  }

  const innerBanner = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "ucr-race-crew-banner"
  );

  const teamMembers = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "team-members"
  );


  return (
    <>
      <InnerBanner
        title={innerBanner?.section_data?.subtitle}
        img={innerBanner?.images?.list?.[0]?.full_path}
      />
      <TeamSection teamMembers={teamMembers} />
    </>
  );
}
