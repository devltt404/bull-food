import { Event } from "@/types/event.type";
import { EventCard, EventCardSkeleton } from "../EventCard";

interface EventCardsGridProps {
  events?: Event[];
  isLoading: boolean;
}

const EventCardsGrid = ({ events, isLoading }: EventCardsGridProps) => (
  <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {isLoading
      ? Array.from({ length: 8 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))
      : events &&
        events.map((event) => (
          <EventCard key={event.id} event={event} isTextTruncate={false} />
        ))}
  </div>
);

export default EventCardsGrid;
