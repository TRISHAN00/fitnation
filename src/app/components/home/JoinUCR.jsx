import Image from "next/image";
import Button from "../Button";

export default function Joinfitnation({ data }) {
  const image = data?.images?.list?.[0]?.full_path;
  const subtitle = data?.section_data?.subtitle;
  const short_desc = data?.section_data?.short_desc;
  const description = data?.section_data?.description;

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      {/* Desktop View */}
      <div className="hidden lg:block max-w-[1300px] mx-auto">
        <div className="relative mx-auto min-h-[600px] md:min-h-[500px] max-w-full">
          {/* Background Image */}
          {image && (
            <div className="absolute left-1/3 transform -translate-x-1/3 inset-0 max-w-[500px] ">
              <Image
                src={image}
                alt="Runner in action"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}

          {/* Content Overlay */}
          <div className="relative z-10 py-10  flex flex-col items-end mx-auto max-w-2xl">
            {/* Title Cards */}
            {subtitle && (
              <div className="bg-white rounded-lg p-4 mb-4 shadow-lg ">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">
                  {subtitle}
                </h2>
              </div>
            )}

            {short_desc && (
              <div className="bg-white rounded-lg p-4 mb-6 shadow-lg mr-10">
                <h3 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-[#AD242F]">
                  {short_desc}
                </h3>
              </div>
            )}

            {/* Description Card */}
            {description && (
              <div className="bg-white/95 rounded-lg p-6 mb-8 shadow-lg max-w-md ">
                <p className="text-muted-foreground text-lg">{description}</p>
              </div>
            )}

            <div className="absolute z-20 bottom-4 left-1/4 transform -translate-x-1/4 ">
              {/* Button */}
              <Button
                path={"/events"}
                title={"Join Now"}
                className="bg-[#AD242F] text-white hover:bg-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden max-w-[1300px] mx-auto">
        <div className="relative mx-auto min-h-[600px] md:min-h-[500px] max-w-[500px]">
          {/* Background Image */}
          <div className="absolute inset-0 max-w-[500px] ">
            <Image
              src="https://ultracamprunners.com/wp-content/uploads/2024/10/azharfahim.jpeg"
              alt="Runner in action"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 py-10  flex flex-col items-center mx-auto max-w-2xl">
            {/* Title Cards */}
            <div className="bg-white rounded-lg p-4 mb-4 shadow-lg ">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">
                Join Us on the Run
              </h2>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 shadow-lg">
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-[#AD242F]">
                Ultra Camp Runners
              </h3>
            </div>

            {/* Description Card */}
            <div className="bg-white/95 rounded-lg p-6 mb-8 mx-4 shadow-lg max-w-[500px]">
              <p className="text-muted-foreground text-lg text-center">
                At Ultra Camp Runners, we&apos;re not just about organizing
                marathons. We want to create a culture of fitness, friendship,
                and success. We believe in the power of running to bring people
                together and make a positive difference.
              </p>
            </div>

            <div className="z-20 bottom-4">
              {/* Button */}
              <Button
                path={"/join"}
                title={"Join Now"}
                className="bg-[#AD242F] text-white hover:bg-black"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
