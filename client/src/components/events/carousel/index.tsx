import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EventCard from "../../event/card";
import EventCardSkeleton from "../../event/card/skeleton";
import { EventsCarouselComponent } from "./types";

const EventsCarousel: EventsCarouselComponent = ({ events, isFetching }) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-4 md:-ml-8">
        {isFetching
          ? Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="max-w-[20rem] pl-4 md:pl-8">
                <EventCardSkeleton />
              </CarouselItem>
            ))
          : events?.map((event) => (
              <CarouselItem
                key={event.id}
                className="max-w-[20rem] pl-4 md:pl-8"
              >
                <EventCard event={event} />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
};

export default EventsCarousel;
