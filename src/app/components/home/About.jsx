import { motion } from "framer-motion";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaRunning } from "react-icons/fa";

export default function About({ data }) {
  const activeRunners = data?.posts?.list?.find(
    (f) => f.data.slug === "active-runners"
  );

  const eventHosted = data?.posts?.list?.find(
    (f) => f.data.slug === "events-hosted"
  );

  const joinCommunity = data?.posts?.list?.find(
    (f) => f.data.slug === "join-our-community"
  );

  const ourMission = data?.posts?.list?.find(
    (f) => f.data.slug === "our-mission"
  );

  const ourVision = data?.posts?.list?.find(
    (f) => f.data.slug === "our-vision"
  );

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 pt-[120px] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-100/30 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {data?.section_data?.subtitle && (
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-100 to-red-100 rounded-full mb-6">
              <FaRunning className="text-red-600" size={18} />
              <span className="font-semibold tracking-[2px] text-gray-700 uppercase text-sm">
                {data.section_data.subtitle}
              </span>
            </div>
          )}

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-red-800 bg-clip-text text-transparent leading-tight">
            {parse(data?.section_data?.short_desc || "About Our Community")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Main Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">
                {parse(data?.section_data?.description || "")}
              </p>
            </div>

            {/* Stats or Highlights */}
            <div className="grid grid-cols-2 gap-6">
              {activeRunners?.data?.number && (
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {activeRunners?.data?.number}+
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">
                    {activeRunners?.data?.subtitle}
                  </div>
                </div>
              )}

              {eventHosted?.data?.number && (
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {eventHosted?.data?.number}+
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">
                    {eventHosted?.data?.subtitle}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href={"/about-us"}></Link>
              <button className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Learn More About Us
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Center Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4"
          >
            {data?.images?.list?.[0]?.full_path && (
              <div className="relative group">
                {/* Main Image */}
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={data.images.list[0].full_path}
                    alt="Ultra Camp Runners Team"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>

                <Link href={data?.section_data?.anything} target="_blank">
                  <div className="absolute -bottom-4 -left-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <FaRunning className="text-red-600" />
                      <span className="font-semibold text-gray-800">
                        Community Driven
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Right Features Column */}

          <div className="lg:col-span-4 space-y-6">
            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="p-6 bg-gradient-to-r from-purple-600 to-red-600 rounded-xl text-white shadow-xl"
            >
              {joinCommunity?.data?.subtitle && (
                <h4 className="text-xl font-bold mb-3">
                  {joinCommunity?.data?.subtitle}
                </h4>
              )}
              {joinCommunity?.data?.short_desc && (
                <p className="text-purple-100 mb-4">
                  {joinCommunity?.data?.short_desc}
                </p>
              )}
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <h4 className="text-xl font-bold text-red-700 mb-3">
                {ourMission?.data?.subtitle}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {ourMission?.data?.short_desc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <h4 className="text-xl font-bold text-purple-700 mb-3">
                {ourVision?.data?.subtitle}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {ourVision?.data?.short_desc}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
