import { EventsCampus, EventsSortBy } from '../enum/events.enum';
export declare class GetEventsDto {
    campus?: EventsCampus;
    fromDate?: string;
    toDate?: string;
    limit: number;
    range: number;
    sortBy: EventsSortBy;
}
