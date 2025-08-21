import EventCardSkeleton from "@/components/events/card/EventCardSkeleton";

const EventCardsGridSkeleton = () => {
  return (
    <div className="events-cards-grid-wrapper">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
    </div>
  );
};

export default EventCardsGridSkeleton;
