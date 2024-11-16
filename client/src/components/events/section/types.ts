import { Event } from "@/api/events/types";
import { FunctionComponent } from "react";

export type EventsSectionProps = {
  isFetching: boolean;
  events?: Event[];
  label: {
    left?: string;
    right?: string;
    highlight?: string;
  };
};

export type EventsSectionComponent = FunctionComponent<EventsSectionProps>;
