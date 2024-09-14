import { GetEventsDto } from './dto/get-events.dto';
export declare class EventsService {
    getEvents({ campus, fromDate, from, limit, toDate }: GetEventsDto): Promise<{
        events: ({
            listingSeparator: boolean;
            time: string;
            id?: undefined;
            title?: undefined;
            date?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            image?: undefined;
            location?: undefined;
            going?: undefined;
            isSoldOut?: undefined;
            spotsLeft?: undefined;
        } | {
            id: string;
            title: string;
            date: string;
            startTime: string;
            endTime: string;
            image: string;
            location: string;
            going: string;
            isSoldOut: boolean;
            spotsLeft: string;
            listingSeparator?: undefined;
            time?: undefined;
        })[];
        totalEvents: number;
    }>;
}
