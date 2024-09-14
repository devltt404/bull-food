import { EventsCampus, EventsSortBy } from "../src/enums/events.enum";

export interface GetEventsParams {
  campus?: EventsCampus;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  range?: number;
  sortBy?: EventsSortBy;
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
