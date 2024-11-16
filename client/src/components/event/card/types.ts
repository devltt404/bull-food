import { Event } from "@/api/events/types";
import { FunctionComponent } from "react";

export type EventCardComponent = FunctionComponent<{
  event: Event;
  className?: string;
  isTextTruncate?: boolean;
}>;
