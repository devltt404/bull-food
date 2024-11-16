import { Event } from "@/api/events/types";
import { FunctionComponent } from "react";

export type EventsCarouselComponent = FunctionComponent<{
  events?: Event[];
  isFetching: boolean;
}>;
