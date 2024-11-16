import { Event } from "@/api/events/types";
import { FunctionComponent } from "react";

export type EventsGroupsComponent = FunctionComponent<{
  events: Event[];
  isFilterChanged: boolean;
}>;
