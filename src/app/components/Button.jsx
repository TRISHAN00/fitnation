import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Button({ path, title, bgColor }) {
  // Convert custom color to Tailwind-friendly class
  const bgClass = bgColor ? `bg-[${bgColor}]` : "bg-white";
  const textColor = bgColor ? "text-white" : "text-black";

  return (
    <Link
      href={path}
      className={`flex w-fit items-center gap-2 px-6 py-2 rounded-md font-medium transition-all duration-300 ${bgClass} ${textColor} hover:bg-[#232323] hover:text-white hover:scale-110 hover:rotate-[4deg]`}
    >
      {title} <FiArrowRight />
    </Link>
  );
}
