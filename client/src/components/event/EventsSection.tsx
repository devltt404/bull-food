import { cn } from "@/lib/utils";
import { Event } from "@/types/event.type";
import { useInView } from "framer-motion";
import { useRef } from "react";
import EventsCarousel from "./EventsCarousel";

const EventsSection = ({
  isFetching,
  events,
  day,
  useAnimation = false,
}: {
  isFetching: boolean;
  events?: Event[];
  day: "Today" | "Tomorrow";
  useAnimation?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="container" ref={ref}>
      <h2 className="mb-8 border-b pb-4 text-3xl font-semibold text-green-950">
        Featured{" "}
        <span className="relative inline-block px-2.5 py-1 text-white">
          <div
            className={cn(
              "absolute left-0 top-0 -z-10 h-full bg-secondary transition-all delay-100 duration-300 ease-in-out",
              isInView ? "w-full" : "w-0",
            )}
          ></div>
          {day}
        </span>
      </h2>
      <EventsCarousel isFetching={isFetching} events={events} />
    </section>
  );
};

export default EventsSection;
