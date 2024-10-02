import { EventBadgeType } from "@/constants/event.constant";
import { cn } from "@/lib/utils";
import { Event } from "@/types/event.type";
import { classifyEventBadgeType } from "@/utils/helper.util";
import { Clock, MapPin, Users } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { EventBadge } from "./EventBadge";

export const EventCard = ({
  event,
  className,
  isTitleTruncate = true,
}: {
  event: Event;
  className?: string;
  isTitleTruncate?: boolean;
}) => {
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
    <Link
      to={`https://bullsconnect.usf.edu/web/rsvp_boot?id=${event.id}`}
      target="_blank"
    >
      <div
        className={cn(
          "overflow-hidden rounded-br-2xl rounded-tl-2xl border-2 bg-white transition hover:border-primary",
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
              isTitleTruncate && "truncate",
              eventBadgeType === EventBadgeType.hot && "text-red-600",
              eventBadgeType === EventBadgeType.popular && "text-yellow-600",
            )}
          >
            {event.title}
          </h3>
          <ul className="flex flex-col gap-1">
            {eventDetails.map((detail, index) => (
              <li key={index} className="flex items-center text-gray-500">
                <detail.icon size={16} className="mr-2 inline-block" />
                <span className="text-sm">{detail.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export const EventCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-br-2xl rounded-tl-2xl border-2 bg-white">
      <div className="relative">
        {/* Skeleton for the image */}
        <div className="h-40 w-full animate-pulse bg-gray-200" />
      </div>
      <div className="px-4 pb-5 pt-4">
        {/* Skeleton for the title */}
        <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Skeleton for the list items */}
        <ul className="flex flex-col gap-2">
          <li className="flex items-center text-muted-foreground">
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </li>
          <li className="flex items-center text-muted-foreground">
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          </li>
          <li className="flex items-center text-muted-foreground">
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          </li>
        </ul>
      </div>
    </div>
  );
};
