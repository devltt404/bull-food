import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Event } from "@/types/event.type";
import { EventCard, EventCardSkeleton } from "./EventCard";

const EventsCarousel = ({
  events,
  isFetching,
}: {
  events: Event[] | undefined;
  isFetching: boolean;
}) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-4 md:-ml-8">
        {isFetching
          ? Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/4 pl-4 md:pl-8">
                <EventCardSkeleton />
              </CarouselItem>
            ))
          : events?.map((event) => (
              <CarouselItem key={event.id} className="basis-1/4 pl-4 md:pl-8">
                <EventCard event={event} />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
};

export default EventsCarousel;
