import useGroupedEvents from "@/hooks/useGroupedEvents";
import { Event } from "@/types/event.type";
import { EventCard, EventCardSkeleton } from "./EventCard";

interface EventsGridProps {
  events?: Event[];
  isLoading: boolean;
  isFilterChanged: boolean;
}

const EventsGrid = ({
  events,
  isLoading,
  isFilterChanged,
}: EventsGridProps) => {
  const groupedEvents = useGroupedEvents(events, isFilterChanged);

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {Object.keys(groupedEvents).length === 0 ? (
        <p className="text-2xl font-medium">No Events found</p>
      ) : (
        Object.keys(groupedEvents).map((key) => (
          <div className="mb-8" key={key}>
            <h3 className="mb-4 text-2xl font-semibold text-secondary">{key}</h3>
            <ul className="grid grid-cols-4 gap-8">
              {groupedEvents[key].map((event) => (
                <li key={event.id}>
                  <EventCard event={event} isTitleTruncate={false} />
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </>
  );
};

export default EventsGrid;
