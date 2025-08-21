import { Event } from "@/api/events/types";
import EmptyEvents from "@/components/events/EmptyEvents";
import EventCard from "@/components/events/card/EventCard";
import EventCardSkeleton from "@/components/events/card/EventCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface EventsSectionProps {
  isFetching: boolean;
  events?: Event[];
  label: {
    left?: string;
    right?: string;
    highlight?: string;
  };
}

const EventsSection = ({ isFetching, events, label }: EventsSectionProps) => {
  return (
    <section className="container">
      <h2 className="mb-8 border-b-2 border-b-secondary pb-5 text-3xl font-semibold tracking-[0.01em] text-green-950">
        {label.left}{" "}
        <div className="relative inline-block px-3 py-1 text-white">
          <div className="bg-secondary-gradient absolute top-0 left-0 -z-10 h-full w-full" />
          {label.highlight}
        </div>{" "}
        {label.right}
      </h2>

      {isFetching || (events && events.length > 0) ? (
        <Carousel>
          <CarouselContent className="-ml-4 md:-ml-8">
            {isFetching
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="max-w-[20rem] pl-4 md:pl-8"
                  >
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
      ) : (
        <EmptyEvents />
      )}
    </section>
  );
};

export default EventsSection;
