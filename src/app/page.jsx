"use client";
import { useEffect, useState } from "react";
import About from "./components/home/About";
import ExploreEvents from "./components/home/ExploreEvents";
import GallerySection from "./components/home/Gallery";
import Hero from "./components/home/Hero";
import StatsSection from "./components/home/Stats";
import AnimatedPreloader from "./components/Prealoader";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=home-page&get_section=yes&image=yes&post=yes&file=no&gallery=no`
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
    return <AnimatedPreloader />;
  }

  const hero = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "hero-section"
  );

  const aboutUs = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-us"
  );

  const exploreEvent = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "explore-our-events"
  );

  const gallery = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-gallery"
  );

  const ourServices = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-features"
  );

  // const upcomingEvents = data?.data?.sections?.find(
  //   (f) => f?.section_data?.slug === "our-events"
  // );
  // const features = data?.data?.sections?.find(
  //   (f) => f?.section_data?.slug === "our-features"
  // );
  // const joinUs = data?.data?.sections?.find(
  //   (f) => f?.section_data?.slug === "join-us"
  // );

  // const blogs = data?.data?.sections?.find(
  //   (f) => f?.section_data?.slug === "blogs"
  // );

  const counter = data?.data?.sections?.find(
    (f) => f?.section_data?.slug === "counter"
  );

  return (
    <>
      <Hero data={hero} />
      <About data={aboutUs} />
      <ExploreEvents data={exploreEvent} />
      <GallerySection data={gallery} />
      <StatsSection data={counter} />
      {/* <Services data={ourServices} /> */}
      {/* 
      <UpcomingEvents title={upcomingEvents} />
      
    />
     
   */}
    </>
  );
}
