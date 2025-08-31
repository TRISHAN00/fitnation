import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-md overflow-hidden border">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={blog?.images?.list?.[0]?.full_path}
          alt="Blog Cover"
          width={400}
          height={300}
          className="w-full w-max-6 object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {blog?.data?.title && (
          <h2 className="text-lg font-bold text-red-700">
            {parse(blog?.data?.title)}
          </h2>
        )}

        <div className="text-gray-700 text-sm mt-2 line-clamp-4">
          {parse(blog?.data?.body || "")}
        </div>

        <Link
          href={`news/${blog?.data?.slug}`}
          className="text-red-600 font-medium flex items-center mt-3 hover:underline"
        >
          Click here
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
