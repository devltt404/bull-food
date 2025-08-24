import { Event, GroupedEvents } from "@/api/events/types";
import EventCard from "@/components/events/card/EventCard";
import { cn } from "@/utils/cn";
import { isBefore, isToday, isTomorrow } from "date-fns";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface EventsGroupProps {
  date: string;
  events: Event[];
}
const EventsGroup = ({ date, events }: EventsGroupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={cn(
        "mb-10 border-t-2 border-t-secondary",
        isInView
          ? "animate-in duration-500 ease-in-out slide-in-from-bottom-10 fade-in"
          : "opacity-0",
      )}
    >
      <h3 className="gradient-text bg-secondary-gradient my-7 text-3xl font-semibold">
        {date}
      </h3>
      <div className="events-cards-grid-wrapper">
        {events.map((event) => (
          <EventCard key={event.id} event={event} isTextTruncate={false} />
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

    if (isToday(dateObj)) key = "Today";
    else if (isTomorrow(dateObj)) key = "Tomorrow";
    else if (isBefore(dateObj, today)) key = "Ongoing";

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
