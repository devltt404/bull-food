import EventCardSkeleton from "@/components/events/card/EventCard.skeleton";

const EventsGroupsSkeleton = () => {
  return (
    <div>
      <div className="my-7 h-9 w-60 animate-pulse rounded-sm bg-gray-200"></div>
      <div className="events-cards-grid-wrapper">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default EventsGroupsSkeleton;
