import useGroupedEvents from "@/hooks/useGroupedEvents";
import { Event } from "@/types/event.type";
import { EventCard, EventCardSkeleton } from "./EventCard";
import NoEvents from "./NoEvents";

interface EventsGridProps {
  events?: Event[];
  isLoading: boolean;
  isFilterChanged: boolean;
}

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {children}
  </div>
);

const EventsGrid = ({
  events,
  isLoading,
  isFilterChanged,
}: EventsGridProps) => {
  const groupedEvents = useGroupedEvents(events, isFilterChanged);

  if (isLoading) {
    return (
      <Grid>
        {Array.from({ length: 8 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  return isLoading || Object.keys(groupedEvents).length > 0 ? (
    <>
      {Object.keys(groupedEvents).length === 0 ? (
        <p className="text-2xl font-medium">No Events found</p>
      ) : (
        Object.keys(groupedEvents).map((key) => (
          <div className="mb-10 border-t-2 border-t-secondary" key={key}>
            <h3 className="gradient-text my-7 bg-gradient-to-r from-green-700 to-primary text-3xl font-semibold">
              {key}
            </h3>
            <Grid>
              {groupedEvents[key].map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isTextTruncate={false}
                />
              ))}
            </Grid>
          </div>
        ))
      )}
    </>
  ) : (
    <NoEvents />
  );
};

export default EventsGrid;
