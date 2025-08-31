import UpcomingEventListCard from "./UpcomingEventListCard";

const UpcomingEventList = ({ events, upComingEvent }) => {
  return (
    <section className="py-32  md:px-6 lg:px-8 max-w-[1300px] mx-auto ">
      <div className="container mx-auto px-4">
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upComingEvent?.posts?.list?.map((event) => (
            <UpcomingEventListCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventList;
