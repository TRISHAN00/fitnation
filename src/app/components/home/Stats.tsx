import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({ value, inView }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    const duration = 2000; // 2 seconds

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOutCubic * value);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, inView]);

  return <span ref={numberRef}>{displayValue.toLocaleString()}</span>;
};

export default function StatsSection({ data }) {
  console.log(data?.section_data?.subtitle);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = data?.posts?.list?.map((item) => ({
    label: item.data.title,
    value: parseInt(item.data.number.replace(/,/g, ""), 10),
    prefix: "+",
  })) || [
    { label: "Active Runners", value: 15000, prefix: "+" },
    { label: "Miles Completed", value: 250000, prefix: "+" },
    { label: "Events Hosted", value: 500, prefix: "+" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Enhanced Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700 hover:scale-110"
          style={{
            backgroundImage: data?.images?.list?.[0]?.full_path
              ? `url('${data.images.list[0].full_path}')`
              : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              {data?.section_data?.subtitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {data?.section_data?.short_desc}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group text-center transform transition-all duration-700 hover:scale-105 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Stat Card */}
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

                  {/* Number */}
                  <div className="relative text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
                    <AnimatedNumber value={stat.value} inView={inView} />
                    <span className="text-red-400">{stat.prefix}</span>
                  </div>

                  {/* Label */}
                  <div className="relative text-lg md:text-xl font-semibold text-gray-300 uppercase tracking-wider">
                    {stat.label}
                  </div>

                  {/* Accent Line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto mt-4 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105">
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
