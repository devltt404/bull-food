import EventCardSkeleton from "@/components/event/card/skeleton";

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
