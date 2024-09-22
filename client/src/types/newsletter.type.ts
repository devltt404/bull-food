import { EventCampus } from "@/constants/event.constant";

export interface SubscribeParams {
  email: string;
  campus: EventCampus;
}

export interface Subscriber {
  email: string;
  campus: EventCampus;
}
