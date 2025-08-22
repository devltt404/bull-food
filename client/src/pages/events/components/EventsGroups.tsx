import { Event } from "@/api/events/types";
import useGroupedEvents from "@/hooks/use-grouped-events";
import EventsGroup from "./EventsGroup";

interface EventsGroupsProps {
  events: Event[];
  isFilterChanged: boolean;
}
const EventsGroups = ({ events, isFilterChanged }: EventsGroupsProps) => {
  const groupedEvents = useGroupedEvents(events, isFilterChanged);

  return Object.keys(groupedEvents).map((key) => (
    <EventsGroup key={key} date={key} events={groupedEvents[key]} />
  ));
};

export default EventsGroups;
