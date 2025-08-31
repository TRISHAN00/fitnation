import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock data for demonstration
const mockData = {
  posts: {
    list: [
      {
        images: [{ full_path: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop" }],
        alt: "Web Development Service",
        data: { title: "Web Development" }
      },
      {
        images: [{ full_path: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop" }],
        alt: "Mobile App Development",
        data: { title: "Mobile Apps" }
      },
      {
        images: [{ full_path: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop" }],
        alt: "Digital Marketing",
        data: { title: "Digital Marketing" }
      },
      {
        images: [{ full_path: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" }],
        alt: "Data Analytics",
        data: { title: "Data Analytics" }
      },
      {
        images: [{ full_path: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop" }],
        alt: "Cloud Solutions",
        data: { title: "Cloud Solutions" }
      },
      {
        images: [{ full_path: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop" }],
        alt: "AI & Machine Learning",
        data: { title: "AI & Machine Learning" }
      }
    ]
  }
};

const iconMap = {
  0: Zap,
  1: Sparkles,
  2: ArrowRight,
  3: Shield,
  4: Zap,
  5: Sparkles
};

export default function Services({ data = mockData }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-transparent via-purple-500/5 to-transparent rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300 font-medium">What We Offer</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent leading-tight">
            Our <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Services</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into digital reality with cutting-edge solutions designed for the future
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.posts?.list?.map((service, index) => {
            const Icon = iconMap[index] || Zap;
            
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card */}
                <div className={`
                  relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden
                  transition-all duration-500 ease-out cursor-pointer
                  ${hoveredCard === index 
                    ? 'transform -translate-y-4 scale-105 shadow-2xl shadow-purple-500/20 border-purple-500/30' 
                    : 'hover:border-white/20'
                  }
                `}>
                  {/* Gradient overlay that appears on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-red-600/20
                    transition-opacity duration-500
                    ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}
                  `}></div>
                  
                  {/* Image container */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service?.images?.[0]?.full_path}
                      alt={service.alt}
                      width={100}
                      height={100}
                      className={`
                        w-full h-full object-cover transition-all duration-700
                        ${hoveredCard === index ? 'scale-110 brightness-110' : 'scale-100'}
                      `}
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Floating icon */}
                    <div className={`
                      absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                      transition-all duration-500
                      ${hoveredCard === index ? 'bg-purple-500/20 border-purple-400/40 scale-110' : ''}
                    `}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <h3 className={`
                      text-xl font-bold mb-3 transition-all duration-300
                      ${hoveredCard === index 
                        ? 'text-white text-2xl' 
                        : 'text-gray-200'
                      }
                    `}>
                      {service?.data?.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      Innovative solutions tailored to meet your specific needs and drive your business forward.
                    </p>
                    
                    {/* CTA Button */}
                    <div className={`
                      flex items-center gap-2 text-sm font-semibold transition-all duration-300
                      ${hoveredCard === index 
                        ? 'text-purple-300 translate-x-1' 
                        : 'text-gray-500'
                      }
                    `}>
                      <span>Learn More</span>
                      <ArrowRight className={`
                        w-4 h-4 transition-transform duration-300
                        ${hoveredCard === index ? 'translate-x-1' : ''}
                      `} />
                    </div>
                  </div>
                  
                  {/* Animated border */}
                  <div className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[1px]
                    transition-opacity duration-500 pointer-events-none
                    ${hoveredCard === index ? 'opacity-50' : 'opacity-0'}
                  `}>
                    <div className="w-full h-full bg-transparent rounded-2xl"></div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20
                  blur-xl transition-opacity duration-500 -z-10
                  ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}
                `}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-red-600 rounded-full font-bold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Explore All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}