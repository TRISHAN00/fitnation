import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaFacebook,
  FaMapMarkerAlt,
  FaRoute,
  FaUser,
} from "react-icons/fa";

const UpcomingEventListCard = ({ event }) => {
  console.log(event);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Event Banner */}
      {event?.images?.[0]?.full_path && (
        <div className="relative h-64 w-full">
          <Image
            src={event?.images?.[0]?.full_path}
            alt={event?.data?.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Event Details */}
      <div className="p-5">
        {event?.data?.title && (
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {event?.data?.title}
          </h3>
        )}

        <div className="space-y-2 mb-4">
          {/* Organizer */}
          {event?.data?.event_organizer && (
            <div className="flex items-center text-gray-600">
              <FaUser className="mr-2 text-indigo-600" />
              <span>{event?.data?.event_organizer}</span>
            </div>
          )}

          {/* Date */}
          {event?.data?.date && (
            <div className="flex items-center text-gray-600">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              <span>{event?.data?.date}</span>
            </div>
          )}

          {/* Location */}
          {event?.data?.event_location && (
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-indigo-600" />
              <span>{event?.data?.event_location}</span>
            </div>
          )}

          {/* Distance - New Field */}
          {event?.data?.distance && (
            <div className="flex items-center text-gray-600">
              <FaRoute className="mr-2 text-indigo-600" />
              <span>{event?.data?.distance}</span>
            </div>
          )}
        </div>

        {/* Facebook Link Button */}
        {event?.data?.event_fb_link && (
          <div className="mt-4">
            <Link
              href={event?.data?.event_fb_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaFacebook className="mr-2" />
              View on Facebook
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventListCard;
