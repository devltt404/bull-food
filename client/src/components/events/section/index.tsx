import { useRef } from "react";
import EventsCarousel from "../carousel";
import EmptyEvents from "../empty";
import { EventsSectionComponent } from "./types";

const EventsSection: EventsSectionComponent = ({
  isFetching,
  events,
  label,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      className="container"
      style={{ animationFillMode: "both" }}
      ref={ref}
    >
      <h2 className="mb-8 border-b-2 border-b-secondary pb-5 text-3xl font-semibold tracking-[0.01em] text-green-950">
        {label.left}{" "}
        <span className="relative inline-block px-3 py-1 text-white">
          <div className="absolute left-0 top-0 -z-10 h-full w-full bg-secondary-gradient transition-all delay-100 duration-500 ease-in-out"></div>
          {label.highlight}
        </span>{" "}
        {label.right}
      </h2>

      {isFetching || (events && events.length > 0) ? (
        <EventsCarousel events={events} isFetching={isFetching} />
      ) : (
        <EmptyEvents />
      )}
    </section>
  );
};

export default EventsSection;
