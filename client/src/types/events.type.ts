import { EventCampus } from "../constants/event.constant";

export enum EventsFilterOption {
  quick = "quick",
  advanced = "advanced",
}

export interface GetEventsParams {
  campus: EventCampus;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  range?: number;
  searchWord?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string | null;
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  image: string;
  location: string;
  going: number;
}

export interface GetEventsData {
  events: Event[];
}
