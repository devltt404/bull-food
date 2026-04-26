import { Event } from "@/api/events/types";
import EventCard from "@/components/events/card/EventCard";
import EventCardSkeleton from "@/components/events/card/EventCard.skeleton";
import { ReactNode } from "react";

export interface EventsSectionProps {
  isFetching: boolean;
  events?: Event[];
  label: string;
  emptyContent?: ReactNode;
}

const EventsSection = ({ isFetching, events, label, emptyContent }: EventsSectionProps) => {
  return (
    <section className="container">
      <h2 className="mb-8 font-display text-3xl font-bold tracking-tight">
        {label}
      </h2>

      {isFetching || (events && events.length > 0) ? (
        <div className="events-cards-grid-wrapper">
          {isFetching
            ? Array.from({ length: 5 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            : events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
        </div>
      ) : (
        emptyContent
      )}
    </section>
  );
};

export default EventsSection;
