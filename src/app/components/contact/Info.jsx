"use client";

import parse from "html-react-parser";
import Image from "next/image";

export default function Info({ info }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {info?.posts?.list?.map((item, index) => {
            const title = item?.data?.title || "No title";
            const description = item?.data?.description || "";
            const icon = item?.images?.[0]?.full_path || "";

            return (
              <div
                key={item?.id || index}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                    {icon ? (
                      <Image
                        src={icon}
                        alt={title}
                        width={24}
                        height={24}
                        className="group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-purple-600 rounded"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {title}
                    </h3>
                    <div className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {parse(description)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}