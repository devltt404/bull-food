import { Event } from "@/api/events/types";
import { cn } from "@/utils/cn";
import { formatRelativeDate, isEventLive } from "@/utils/helper";
import { Building2, CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import React, { startTransition, useMemo, useState } from "react";

const EventDialog = React.lazy(() => import("./EventDialog"));

interface EventCardProps {
  event: Event;
  className?: string;
}

const EventCard = ({ event, className }: EventCardProps) => {
  const [showEventDialog, setShowEventDialog] = useState(false);

  const live = useMemo(() => isEventLive(event), [event]);

  const dateText = useMemo(() => {
    const dateStr = event.startDate || event.date;
    return dateStr ? formatRelativeDate(dateStr) : null;
  }, [event.startDate, event.date]);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          startTransition(() => setShowEventDialog(true));
        }}
        className={cn(
          "group/card w-full overflow-hidden rounded-xl border bg-card text-left text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
          className,
        )}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          {live && (
            <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Live
            </span>
          )}
          <img
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            src={event.image}
            alt={event.title + " thumbnail"}
          />
        </div>

        <div className="flex flex-col p-5">
          <div className="mb-3 flex items-center justify-between gap-4 text-sm font-medium text-muted-foreground">
            {dateText && (
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" />
                {dateText}
              </span>
            )}
            {event.startTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {event.startTime}
                {event.endTime ? ` - ${event.endTime}` : ""}
              </span>
            )}
          </div>

          <h3 className="mb-3 line-clamp-2 font-display text-xl leading-tight font-bold tracking-tight transition-colors group-hover/card:text-primary">
            {event.title}
          </h3>

          <div className="grid grid-cols-[1rem_1fr] items-center gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
            {event.organizer && (
              <>
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{event.organizer}</span>
              </>
            )}
            {event.going > 0 && (
              <>
                <Users className="h-3.5 w-3.5 shrink-0" />
                <span>{event.going} going</span>
              </>
            )}
          </div>
        </div>
      </button>

      <React.Suspense>
        <EventDialog
          eventId={event.id}
          show={showEventDialog}
          setShow={setShowEventDialog}
        />
      </React.Suspense>
    </>
  );
};

export default EventCard;
