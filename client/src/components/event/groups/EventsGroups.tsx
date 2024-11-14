import useGroupedEvents from "@/hooks/useGroupedEvents";
import { Event } from "@/types/event.type";
import NoEvents from "../NoEvents";
import EventCardsGrid from "./EventCardsGrid";
import EventsGroup from "./EventsGroup";

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
    return <EventCardsGrid isLoading={true} />;
  }

  return isLoading || Object.keys(groupedEvents).length > 0 ? (
    <>
      {Object.keys(groupedEvents).length === 0 ? (
        <p className="text-2xl font-medium">No Events found</p>
      ) : (
        Object.keys(groupedEvents).map((key) => (
          <EventsGroup date={key} events={groupedEvents[key]} />
        ))
      )}
    </>
  ) : (
    <NoEvents />
  );
};

export default EventsGrid;
