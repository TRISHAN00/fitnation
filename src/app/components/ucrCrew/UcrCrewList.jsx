// app/page.jsx (Example usage)
import TeamSection from '@/components/TeamSection';

export default function Home() {
  const teamMembers = [
    {
      id: 1,
      name: "Minhazul Asif",
      title: "Founder & CEO",
      image: "/images/team/minhazul-asif.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" },
        { type: "youtube", url: "#" },
        { type: "website", url: "#" },
        { type: "behance", url: "#" }
      ]
    },
    {
      id: 2,
      name: "Alamgir H Kabir",
      title: "CFO & Mentor",
      image: "/images/team/alamgir-kabir.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" },
        { type: "youtube", url: "#" },
        { type: "website", url: "#" },
        { type: "twitter", url: "#" },
        { type: "instagram", url: "#" },
        { type: "github", url: "#" }
      ]
    },
    {
      id: 3,
      name: "AB Robin",
      title: "Head of Education & Mentor",
      image: "/images/team/ab-robin.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" },
        { type: "youtube", url: "#" },
        { type: "website", url: "#" }
      ]
    },
    {
      id: 4,
      name: "Saidul Khan",
      title: "CTO & Mentor",
      image: "/images/team/saidul-khan.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" }
      ]
    },
    {
      id: 5,
      name: "Sheikh Azhar Fahim",
      title: "Office Executive",
      image: "/images/team/sheikh-azhar-fahim.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" },
        { type: "instagram", url: "#" },
        { type: "website", url: "#" },
        { type: "github", url: "#" }
      ]
    },
    {
      id: 6,
      name: "Md Badsha Mia",
      title: "Head of Student Affairs",
      image: "/images/team/md-badsha-mia.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" },
        { type: "instagram", url: "#" }
      ]
    },
    {
      id: 7,
      name: "Rima Akter Ritu",
      title: "Sr. Executive, Sales",
      image: "/images/team/rima-akter-ritu.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" },
        { type: "youtube", url: "#" }
      ]
    },
    {
      id: 8,
      name: "Kawsar Ahmed",
      title: "Sr. Executive, Support & Mentor",
      image: "/images/team/kawsar-ahmed.jpg",
      socials: [
        { type: "linkedin", url: "#" },
        { type: "facebook", url: "#" },
        { type: "website", url: "#" }
      ]
    }
  ];

  return (
    <main>
      <TeamSection teamMembers={teamMembers} />
      {/* Other sections */}
    </main>
  );
}