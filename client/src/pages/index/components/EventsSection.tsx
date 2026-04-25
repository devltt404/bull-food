import { Event } from "@/api/events/types";
import EmptyEvents from "@/components/events/EmptyEvents";
import EventCard from "@/components/events/card/EventCard";
import EventCardSkeleton from "@/components/events/card/EventCard.skeleton";

export interface EventsSectionProps {
  isFetching: boolean;
  events?: Event[];
  label: {
    left?: string;
    right?: string;
    highlight?: string;
  };
}

const EventsSection = ({ isFetching, events, label }: EventsSectionProps) => {
  return (
    <section className="container">
      <h2 className="mb-8 font-display text-3xl font-bold tracking-tight">
        {label.left} {label.highlight} {label.right}
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
        <EmptyEvents />
      )}
    </section>
  );
};

export default EventsSection;
