"use client";

import Image from "next/image";

const InnerBanner = ({ img, subtitle = "", title = "" }) => {
  console.log(img)
  return (
    <section className="relative w-full h-[60vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src={img}
        alt={title || "Banner"}
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        {subtitle && (
          <p className="text-white/80 text-sm sm:text-base uppercase tracking-widest mb-2">
            {subtitle}
          </p>
        )}
        {title && (
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl">
            {title}
          </h1>
        )}
      </div>
    </section>
  );
};

export default InnerBanner;
