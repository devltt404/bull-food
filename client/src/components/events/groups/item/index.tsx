import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";
import EventCardsGrid from "../../grid";
import { EventsGroupsItemComponent } from "./types";

const EventsGroupsItem: EventsGroupsItemComponent = ({ date, events }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="events-groups-item-wrapper">
      <div
        ref={ref}
        className={cn("opacity-0", isInView && "animate-fade-up")}
        style={{ animationFillMode: "forwards" }}
      >
        <h3 className="gradient-text my-7 bg-secondary-gradient text-3xl font-semibold">
          {date}
        </h3>
        <EventCardsGrid events={events} />
      </div>
    </div>
  );
};

export default EventsGroupsItem;
