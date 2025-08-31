import parse from "html-react-parser";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import Button from "../Button";

export default function ExploreEvents({ data }) {
  const events = data?.posts?.list;

  const eventTitle = data?.section_data?.event_title;
  const eventDesc = data?.section_data?.event_desc;
  const totalEv = data?.section_data?.total_events;
  const totalRun = data?.section_data?.total_runners;

  console.log(data);

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-red-50/30"></div>
      <div className="absolute inset-0 opacity-5"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-red-800 bg-clip-text text-transparent leading-tight">
            {parse(data?.section_data?.subtitle || "Explore Our Events")}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {data?.section_data?.short_desc}
          </p>

          <div className="inline-block">
            <Button
              bgColor={"#AD242F"}
              path={"/events"}
              title={"Explore All Events"}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            />
          </div>
        </div>

        {/* Events Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Event List */}
          <div className="space-y-6">
            {events?.map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:transform hover:translate-x-2">
                  {/* Event Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <RunnerIcon className="w-6 h-6 text-white" />
                  </div>

                  {/* Event Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {item?.data?.title}
                    </h4>
                  </div>

                  {/* Arrow */}
                  <FaArrowRight className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Hero Image with Overlay */}
          <div className="relative">
            {data?.images?.list?.[0]?.full_path && (
              <div className="relative group">
                {/* Main Image Container */}
                <div
                  className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${data.images.list[0].full_path}')`,
                  }}
                >
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-red-600/20"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Live Events</span>
                      </div>
                      {eventTitle && (
                        <h4 className="text-2xl font-bold">{eventTitle}</h4>
                      )}

                      {eventDesc && (
                        <p className="text-white/90">{eventDesc}</p>
                      )}

                      <div className="flex items-center gap-6 pt-2">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{totalEv}+</div>
                          <div className="text-sm text-white/70">Events</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{totalRun}+</div>
                          <div className="text-sm text-white/70">Runners</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">5★</div>
                          <div className="text-sm text-white/70">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center">
                      <FaCalendarAlt className="text-white text-sm" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Next Event
                      </div>
                      <div className="text-sm text-gray-600">Coming Soon</div>
                    </div>
                  </div>
                </div>

                <Link href={data?.section_data?.anything} target="_blank">
                  <div className="absolute -bottom-6 -right-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        Join
                      </div>
                      <div className="text-sm text-gray-600">Community</div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RunnerIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"></path>
    </svg>
  );
}
