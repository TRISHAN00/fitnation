import TeamCard from "./TeamCard";

const TeamSection = ({ teamMembers }) => {
  return (
    <section className="py-32  md:px-6 lg:px-8 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers?.images?.list?.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
    </section>
  );
};

export default TeamSection;
