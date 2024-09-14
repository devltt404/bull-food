import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Clock, Heart, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "types/events.type";

const EventsCarouselItem = ({ event }: { event: Event }) => {
  return (
    <CarouselItem className="basis-1/4 pl-2 md:pl-4">
      <Link
        to={`https://bullsconnect.usf.edu/web/rsvp_boot?id=${event.id}`}
        target="_blank"
      >
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="relative">
            <img className="h-40 w-full object-cover" src={event.image} />

            <button className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-secondary">
              <Heart size={20} />
            </button>
          </div>
          <div className="px-4 pb-5 pt-3">
            <h3 className="mb-2 text-xl font-medium">{event.title}</h3>
            <ul className="space-y-1">
              <li className="flex items-center text-muted-foreground">
                <Clock size={16} className="mr-2 inline-block" />
                <span className="text-sm">
                  {event.startTime} - {event.endTime}
                </span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin size={16} className="mr-2 inline-block" />
                <span className="text-sm">{event.location}</span>
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

const EventsCarousel = ({ events }: { events: Event[] }) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-2 gap-4 md:-ml-4">
        {events.map((event) => (
          <EventsCarouselItem key={event.id} event={event} />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default EventsCarousel;
