import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Clock, Heart, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "types/events.type";

const EventsCarouselItemSkeleton = () => {
  return (
    <CarouselItem className="basis-1/4 pl-4 md:pl-8">
      <div className="overflow-hidden rounded-br-2xl rounded-tl-2xl border-2 bg-white">
        <div className="relative">
          {/* Skeleton for the image */}
          <div className="h-40 w-full animate-pulse bg-gray-200" />

          {/* Skeleton for the heart icon */}
          <div className="absolute right-2 top-2 flex h-9 w-9 animate-pulse items-center justify-center rounded-full bg-gray-200" />
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
    </CarouselItem>
  );
};

const EventsCarouselItem = ({ event }: { event: Event }) => {
  return (
    <CarouselItem className="basis-1/4 pl-4 md:pl-8">
      <Link
        to={`https://bullsconnect.usf.edu/web/rsvp_boot?id=${event.id}`}
        target="_blank"
      >
        <div className="overflow-hidden rounded-br-2xl rounded-tl-2xl border-2 bg-white">
          <div className="relative">
            <img className="h-40 w-full object-cover" src={event.image} />

            <button className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-secondary">
              <Heart size={20} />
            </button>
          </div>
          <div className="px-4 pb-5 pt-3">
            <h3 className="mb-1 truncate text-lg font-medium">{event.title}</h3>
            <ul className="flex flex-col gap-1">
              <li className="flex items-center text-muted-foreground">
                <Clock size={16} className="mr-2 inline-block" />
                <span className="text-sm">
                  {event.startTime} - {event.endTime}
                </span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin size={16} className="mr-2 inline-block shrink-0" />
                <span className="text-sm truncate">{event.location}</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Users size={16} className="mr-2 inline-block" />
                <span className="text-sm">{event.going} ongoing</span>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </CarouselItem>
  );
};

const EventsCarousel = ({
  events,
  isLoading,
}: {
  events: Event[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-4 md:-ml-8">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <EventsCarouselItemSkeleton key={index} />
          ))
        ) : events?.length === 0 ? (
          <p>
            There are no events to show at the moment. Please check back later.
          </p>
        ) : (
          events?.map((event) => (
            <EventsCarouselItem key={event.id} event={event} />
          ))
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default EventsCarousel;
