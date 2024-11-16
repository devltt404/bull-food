import EventCard from "@/components/event/card";
import { EventCardsGridComponent } from "./types";

const EventCardsGrid: EventCardsGridComponent = ({ events }) => (
  <div className="events-cards-grid-wrapper">
    {events.map((event) => (
      <EventCard key={event.id} event={event} isTextTruncate={false} />
    ))}
  </div>
);

export default EventCardsGrid;
