import { EventBadgeType } from "@/constants/event.constant";
import { cn } from "@/lib/utils";
import { classifyEventBadgeType } from "@/utils/helper";
import { AnimatePresence } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";

import EventBadge from "../badge";
import EventDialog from "../dialog";
import { EventCardComponent } from "./types";

const EventCard: EventCardComponent = ({
  event,
  className,
  isTextTruncate = true,
}) => {
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
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowEventDialog(true);
        }}
        className={cn(
          "cursor-pointer overflow-hidden rounded-br-2xl rounded-tl-2xl border-2 bg-white transition hover:border-primary",
          eventBadgeType === EventBadgeType.hot && "border-red-500",
          eventBadgeType === EventBadgeType.popular && "border-yellow-500",
          className,
        )}
      >
        <div className="relative">
          <img className="h-40 w-full object-cover" src={event.image} />
          <EventBadge going={event.going} />
        </div>
        <div className="px-4 pb-5 pt-3">
          <h3
            className={cn(
              "mb-1 text-lg font-medium",
              isTextTruncate && "truncate",
              eventBadgeType === EventBadgeType.hot && "text-red-600",
              eventBadgeType === EventBadgeType.popular && "text-yellow-600",
            )}
          >
            {event.title}
          </h3>
          <ul className="flex flex-col gap-1">
            {eventDetails.map((detail, index) => (
              <li key={index} className="flex items-center text-gray-500">
                <detail.icon size={16} className="mr-2 inline-block shrink-0" />
                <p className={cn("text-sm", isTextTruncate && "truncate")}>
                  {detail.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {showEventDialog && (
          <EventDialog setShow={setShowEventDialog} id={event.id} />
        )}
      </AnimatePresence>
    </>
  );
};

export default EventCard;
