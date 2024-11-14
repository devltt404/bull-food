import { cn } from "@/lib/utils";
import { EventsSectionProps } from "@/types/event.type";
import { useRef } from "react";
import EventsCarousel from "./EventsCarousel";
import NoEvents from "./NoEvents";

const EventsSection = ({ isFetching, events, label }: EventsSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      className={cn("container")}
      style={{ animationFillMode: "both" }}
      ref={ref}
    >
      <h2 className="mb-8 border-b pb-4 text-3xl font-semibold tracking-[0.01em] text-green-950">
        {label.left}{" "}
        <span className="relative inline-block px-3 py-1 text-white">
          <div className="absolute left-0 top-0 -z-10 h-full w-full bg-secondary-gradient transition-all delay-100 duration-500 ease-in-out"></div>
          {label.highlight}
        </span>{" "}
        {label.right}
      </h2>

      {isFetching ? (
        <EventsCarousel events={events} isFetching={isFetching} />
      ) : events && events.length > 0 ? (
        <EventsCarousel events={events} isFetching={isFetching} />
      ) : (
        <NoEvents />
      )}
    </section>
  );
};

export default EventsSection;
