import { Event } from "@/api/events/types";
import { EventBadgeType } from "@/constants/event.constant";
import { cn } from "@/utils/cn";
import { classifyEventBadgeType } from "@/utils/helper";
import { Clock, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";
import EventBadge from "./EventBadge";
import EventDialog from "./EventDialog";

interface EventCardProps {
  event: Event;
  className?: string;
  isTextTruncate?: boolean;
}

const EventCard = ({
  event,
  className,
  isTextTruncate = true,
}: EventCardProps) => {
  const [showEventDialog, setShowEventDialog] = useState<boolean>(false);

  const eventBadgeType = useMemo(
    () => classifyEventBadgeType(event.going),
    [event],
  );

  const eventDetails = useMemo(
    () => [
      {
        icon: Clock,
        text: `${event.startTime} - ${event.endTime}`,
      },
      {
        icon: MapPin,
        text: event.location,
      },
      {
        icon: Users,
        text: `${event.going} ongoing`,
      },
    ],
    [event],
  );

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowEventDialog(true);
        }}
        className={cn(
          "group w-full overflow-hidden rounded-tl-2xl rounded-br-2xl border-2 bg-white transition",
          eventBadgeType === EventBadgeType.hot && "border-red-500",
          eventBadgeType === EventBadgeType.popular && "border-yellow-500",
          className,
        )}
      >
        <div className="relative">
          <div className="h-40 overflow-hidden">
            <img
              loading="lazy"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              src={event.image}
              alt={event.title + " thumbnail"}
            />
          </div>

          <EventBadge going={event.going} />
        </div>
        <div className="px-4 pt-3 pb-5 text-left">
          <h3
            className={cn(
              "mb-1 text-lg font-medium",
              isTextTruncate && "truncate",
            )}
          >
            {event.title}
          </h3>
          <ul className="flex flex-col gap-1">
            {eventDetails.map((detail, index) => (
              <li
                key={index}
                className="flex items-center text-muted-foreground"
              >
                <detail.icon size={16} className="mr-2 inline-block shrink-0" />
                <p className={cn("text-sm", isTextTruncate && "truncate")}>
                  {detail.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </button>

      <EventDialog
        eventId={event.id}
        show={showEventDialog}
        setShow={setShowEventDialog}
      />
    </>
  );
};

export default EventCard;
