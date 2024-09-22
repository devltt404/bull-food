import { Event } from "@/types/events.type";
import { useMemo } from "react";
import { EventCard, EventCardSkeleton } from "./EventCard";

interface EventsGridProps {
  events?: Event[];
  isLoading: boolean;
}

const EventsGrid = ({ events, isLoading }: EventsGridProps) => {
  const today = useMemo(() => new Date().getDate(), []);

  const groupedEvents: Record<string, Event[]> | undefined = useMemo(() => {
    return events?.reduce(
      (acc, event) => {
        const date = event.date || event.startDate;
        if (!date) return acc;

        // Generate group key based on date
        let key: string;
        const dateObj = new Date(date);

        if (dateObj.getDate() === today) {
          key = "Today";
        } else if (dateObj.getDate() === today + 1) {
          key = "Tomorrow";
        } else if (dateObj.getDate() < today) {
          key = "Ongoing";
        } else {
          const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            month: "short",
            day: "2-digit",
          };
          key = dateObj.toLocaleDateString("en-US", options);
        }

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(event);

        return acc;
      },
      {} as Record<string, Event[]>,
    );
  }, [events]);

  return isLoading ? (
    <div className="grid grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  ) : (
    groupedEvents &&
      Object.keys(groupedEvents).map((key) => {
        return (
          <div className="mb-8" key={key}>
            <h3 className="mb-4 text-2xl font-semibold">{key}</h3>
            <ul className="grid grid-cols-4 gap-8">
              {groupedEvents[key].map((event) => (
                <li key={event.id}>
                  <EventCard event={event} isTitleTruncate={false} />
                </li>
              ))}
            </ul>
          </div>
        );
      })
  );
};

export default EventsGrid;
