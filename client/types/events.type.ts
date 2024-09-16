import { EventCampus, EventSortBy } from "../src/constants/event.constant";

export interface GetEventsParams {
  campus?: EventCampus;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  range?: number;
  sortBy?: EventSortBy;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  image: string;
  location: string;
  going: number;
  isSoldOut: boolean;
  spotsLeft?: number;
}

export interface GetEventsResponse {
  events: Event[];
}
