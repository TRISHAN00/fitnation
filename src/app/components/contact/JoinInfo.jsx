import parse from 'html-react-parser';
import Image from 'next/image';

export default function JoinInfo({data}) {
  return (
    <section className="bg-gradient-to-br from-purple-700 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40"></div>
      </div>
      
      <div className="max-w-[1300px] mx-auto px-4 py-16 md:py-24 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            {data?.section_data?.subtitle && (
              <div className="inline-block">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-purple-100 border border-white/30">
                  {data?.section_data?.subtitle}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {data?.section_data?.title}
              </span>
            </h1>
            
            <div className="text-lg text-purple-100 leading-relaxed max-w-xl">
              {parse(data?.section_data?.description || "")}
            </div>
      
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent z-10"></div>
              <Image
                src={data?.images?.list?.[0]?.full_path}
                alt="Runner giving thumbs up"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}