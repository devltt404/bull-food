import useGroupedEvents from "@/hooks/useGroupedEvents";
import { Event } from "@/types/event.type";
import { EventCard, EventCardSkeleton } from "./EventCard";
import NoEvents from "./NoEvents";

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

  return isLoading || Object.keys(groupedEvents).length > 0 ? (
    <>
      {Object.keys(groupedEvents).length === 0 ? (
        <p className="text-2xl font-medium">No Events found</p>
      ) : (
        Object.keys(groupedEvents).map((key) => (
          <div className="mb-10" key={key}>
            <h3 className="mb-6 text-3xl font-semibold">{key}</h3>
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  ) : (
    <NoEvents />
  );
};

export default EventsGrid;
