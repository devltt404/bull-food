import { EventCampus } from "../constants/event.constant";

export enum EventsFilterOption {
  quick = "quick",
  advanced = "advanced",
}

export type GetEventsParams = {
  campus: EventCampus;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  range?: number;
  searchWord?: string;
};

export type Event = {
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
};

export type GroupedEvents = {
  [key: string]: Event[];
};

export type EventsSectionProps = {
  isFetching: boolean;
  events?: Event[];
  label: {
    left?: string;
    right?: string;
    highlight?: string;
  };
};
