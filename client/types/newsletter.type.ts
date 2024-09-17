import { EventCampus } from "@/constants/event.constant";

export interface SubscribeParams {
  email: string;
  campus: EventCampus;
}

export interface SubscribeData {
  subscriber: {
    email: string;
    campus: EventCampus;
  };
}
