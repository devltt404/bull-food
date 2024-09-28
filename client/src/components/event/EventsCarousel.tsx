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
  events?: Event[];
  isFetching: boolean;
}) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-4 md:-ml-8">
        {isFetching
          ? Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 md:pl-8 lg:basis-1/3 xl:basis-1/4"
              >
                <EventCardSkeleton />
              </CarouselItem>
            ))
          : events?.map((event) => (
              <CarouselItem
                key={event.id}
                className="pl-4 md:basis-1/2 md:pl-8 lg:basis-1/3 xl:basis-1/4"
              >
                <EventCard event={event} />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
};

export default EventsCarousel;
