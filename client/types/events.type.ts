import { EventCampus } from "../src/constants/event.constant";

export interface GetEventsParams {
  campus: EventCampus;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  range?: number;
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
