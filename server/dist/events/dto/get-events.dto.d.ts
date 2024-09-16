import { EventCampus, EventSortBy } from '../enum/events.enum';
export declare class GetEventsDto {
  campus?: EventCampus;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  range?: number;
  sortBy?: EventSortBy;
}
