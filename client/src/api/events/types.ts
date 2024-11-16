import { EventCampus } from "../../constants/event.constant";

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

export type DetailedEvent = {
  id: string;
  image: string;
  title: string;
  timeInfo1: string;
  timeInfo2?: string;
  location: {
    name: string;
    address?: string;
  };
  tags: string[];
  organizer: string;
  going: number;
  details: {
    image?: string;
    description: string;
  };
  calendarUrl?: {
    google: string;
    outlook: string;
  };
};
