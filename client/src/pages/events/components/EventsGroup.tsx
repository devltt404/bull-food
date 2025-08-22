import { Event } from "@/api/events/types";
import { cn } from "@/utils/cn";
import { useInView } from "framer-motion";
import { useRef } from "react";
import EventCard from "../../../components/events/card/EventCard";

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

export default EventsGroup;
