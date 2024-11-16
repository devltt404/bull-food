import { Event } from "@/api/events/types";
import { FunctionComponent } from "react";

export type EventCardsGridComponent = FunctionComponent<{
  events: Event[];
}>;
