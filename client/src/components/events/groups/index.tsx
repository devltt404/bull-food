import useGroupedEvents from "@/hooks/use-grouped-events";
import EmptyEvents from "../empty";
import EventsGroupsItem from "./item";
import { EventsGroupsComponent } from "./types";

const EventsGroups: EventsGroupsComponent = ({ events, isFilterChanged }) => {
  if (!events.length) return <EmptyEvents />;

  const groupedEvents = useGroupedEvents(events, isFilterChanged);

  return Object.keys(groupedEvents).map((key) => (
    <EventsGroupsItem key={key} date={key} events={groupedEvents[key]} />
  ));
};

export default EventsGroups;
