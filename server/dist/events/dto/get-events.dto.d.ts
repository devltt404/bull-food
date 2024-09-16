import { EventCampus, EventSortOption } from '../constants/event.constant';
export declare class GetEventsDto {
  campus: EventCampus;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  range?: number;
  sortBy?: EventSortOption;
}
