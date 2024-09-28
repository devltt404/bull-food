import { Event, GroupedEvents } from "@/types/event.type";
import { isBefore, isToday, isTomorrow } from "date-fns";
import { useMemo, useRef } from "react";

const useGroupedEvents = (events?: Event[], isFilterChanged?: boolean) => {
  /*
    Implement useRef+useMemo instead of useState+useEffect to ensure that the EventsGrid component 
    doesn't flash the old events before the new events are fetched.
  */
  const groupedEvents = useRef<GroupedEvents>({});
  const eventIdsSet = useRef<Set<string>>(new Set<string>());

  useMemo(() => {
    if (!events) return;

    if (isFilterChanged) {
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
  }, [events, isFilterChanged]);

  return groupedEvents.current;
};

export default useGroupedEvents;
