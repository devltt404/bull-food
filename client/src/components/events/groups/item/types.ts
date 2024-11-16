import { Event } from "@/api/events/types";
import { FunctionComponent } from "react";

export type EventsGroupsItemComponent = FunctionComponent<{
  date: string;
  events: Event[];
}>;
