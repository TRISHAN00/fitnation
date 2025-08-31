import Image from 'next/image';

const TeamCard = ({ member }) => {
  console.log(member)
  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
      <div className="aspect-square relative overflow-hidden">
        <Image 
          src={member.full_path} 
          alt={member.short_title} 
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-5 text-center">
        <h3 className="text-white text-xl font-bold">{member.short_title}</h3>
        <p className="text-orange-500 mt-1 font-medium">{member.short_desc}</p>
        
        
      </div>
    </div>
  );
};

export default TeamCard;