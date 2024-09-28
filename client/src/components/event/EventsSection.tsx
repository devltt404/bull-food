import { cn } from "@/lib/utils";
import { EventsSectionProps } from "@/types/event.type";
import { useInView } from "framer-motion";
import { useRef } from "react";
import EventsCarousel from "./EventsCarousel";
import NoEvents from "./NoEvents";

const EventsSection = ({ isFetching, events, label }: EventsSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="container" ref={ref}>
      <h2 className="mb-8 border-b pb-4 text-3xl font-semibold text-green-950">
        {label.left}{" "}
        <span className="relative inline-block px-2.5 py-1 text-white">
          <div
            className={cn(
              "absolute left-0 top-0 -z-10 h-full bg-secondary transition-all delay-100 duration-300 ease-in-out",
              isInView ? "w-full" : "w-0",
            )}
          ></div>
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
