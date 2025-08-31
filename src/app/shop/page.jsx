"use client";
import { useEffect, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import AnimatedPreloader from "../components/Prealoader";
import ProductCard from "../components/shop/ProductCard";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/get-req-data/sections?type=slug&value=shop&get_section=yes&image=yes&post=yes&file=no&gallery=no`
        );
        const data = await res.json();

        if (data.status === 200) {
          const bannerSection = data.data.sections.find(
            (section) => section?.section_data?.slug === "shop-banner"
          );

          const productSections = data.data.sections.find(
            (section) => section?.section_data?.slug === "t-shirts"
          );

          setBanner(bannerSection);
          setProducts(productSections?.posts?.list);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_BASE_URL]);

  if (loading) {
    return <AnimatedPreloader />;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <>
      {banner && (
        <InnerBanner
          title={banner?.section_data?.subtitle}
          img={banner?.images?.list?.[0]?.full_path}
        />
      )}

      <section className="pt-[120px] pb-[120px]">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.length > 0 ? (
            products.map((item, index) => {
              console.log(item?.images?.[0]?.full_path);
              return (
                <ProductCard
                  key={index}
                  image={item?.images?.[0]?.full_path}
                  name={item?.data?.title || "Title"}
                  price={item?.data?.price || "0"}
                  description={item?.data?.short_description || ""}
                />
              );
            })
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      </section>
    </>
  );
}
