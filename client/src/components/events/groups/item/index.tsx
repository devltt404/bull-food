import { cn } from "@/utils/cn";
import { useInView } from "framer-motion";
import { useRef } from "react";
import EventCardsGrid from "../../grid";
import { EventsGroupsItemComponent } from "./types";

const EventsGroupsItem: EventsGroupsItemComponent = ({ date, events }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={cn(
        "mb-10 border-t-2 border-t-secondary",
        isInView
          ? "animate-in duration-500 ease-in-out slide-in-from-bottom-10 fade-in"
          : "opacity-0",
      )}
    >
      <h3 className="gradient-text bg-secondary-gradient my-7 text-3xl font-semibold">
        {date}
      </h3>
      <EventCardsGrid events={events} />
    </div>
  );
};

export default EventsGroupsItem;
