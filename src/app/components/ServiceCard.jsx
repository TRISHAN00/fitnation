import Image from "next/image";



const services = [
  {
    title: "Event Registration",
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/register-now-document-filling-form-concept-1024x767.jpg",
    alt: "Laptop showing event registration form",
  },
  {
    title: "Event Planning & Management",
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/martins-zemlickis-NPFu4GfFZ7E-unsplash-1024x680.jpg",
    alt: "Marathon runners on city street",
  },
  {
    title: "Timing Solutions",
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/runner-setting-up-smart-watch-before-training-sunset-exercise_53476-3845.jpg",
    alt: "Smart watch showing running statistics",
  },
  {
    title: "Photography, Videography & Drone",
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/jakob-owens-fkaZiACUb5w-unsplash-1024x709.jpg",
    alt: "Professional camera equipment layout",
  },
  {
    title: "Medal Design & Production",
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/kelly-sikkema-o2TRWThve_I-unsplash-1024x677.jpg",
    alt: "Hands working on medal design",
  },
  {
    title: "T-Shirt Design & Production",
    image:
      "https://ultracamprunners.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-21-at-1.28.21-AM-1024x704.jpeg",
    alt: "Sports jersey design mockup",
  },
];

export default function ServiceCard() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={service.image}
            alt={service.alt}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-red-700">{service.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
