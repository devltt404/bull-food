import { Event, GroupedEvents } from "@/api/events/types";
import EventCard from "@/components/events/card/EventCard";
import { isEventLive } from "@/utils/helper";
import { isBefore, isToday, isTomorrow } from "date-fns";
import { useRef } from "react";

const GROUP = {
  ongoing: "Ongoing",
  today: "Today",
  tomorrow: "Tomorrow",
} as const;


interface EventsGroupProps {
  date: string;
  events: Event[];
}
const EventsGroup = ({ date, events }: EventsGroupProps) => {
  return (
    <div className="animate-fade-up space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-tight border-l-4 border-primary py-2 pl-4">
        {date}
      </h2>
      <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

interface EventsGroupsProps {
  events: Event[];
  isFilterUpdated: boolean;
}
const EventsGroups = ({ events, isFilterUpdated }: EventsGroupsProps) => {
  // BullsConnect sometimes returns duplicate events across pages.
  // Track existing event IDs to avoid adding duplicates.
  const eventIdsSet = useRef<Set<string>>(new Set<string>());
  const groupedEvents = useRef<GroupedEvents>({});

  // Clear the existing events to store new events after filter update
  if (isFilterUpdated) {
    groupedEvents.current = {};
    eventIdsSet.current.clear();
  }

  const today = new Date();
  const newGroupedEvents: GroupedEvents = {};

  events.forEach((event) => {
    if (eventIdsSet.current.has(event.id)) return;

    const date = event.date || event.startDate;
    if (!date) return;

    let key = date;
    const dateObj = new Date(date);

    if (isEventLive(event)) key = GROUP.ongoing;
    else if (isToday(dateObj)) key = GROUP.today;
    else if (isTomorrow(dateObj)) key = GROUP.tomorrow;
    else if (isBefore(dateObj, today)) key = GROUP.ongoing;

    if (!newGroupedEvents[key]) newGroupedEvents[key] = [];
    newGroupedEvents[key].push(event);
    eventIdsSet.current.add(event.id);
  });

  Object.keys(newGroupedEvents).forEach((key) => {
    if (groupedEvents.current[key]) {
      groupedEvents.current[key] = [
        ...groupedEvents.current[key],
        ...newGroupedEvents[key],
      ];
    } else {
      groupedEvents.current[key] = newGroupedEvents[key];
    }
  });

  return Object.keys(groupedEvents.current).map((key) => (
    <EventsGroup key={key} date={key} events={groupedEvents.current[key]} />
  ));
};

export default EventsGroups;
