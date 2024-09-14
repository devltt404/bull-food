import { GetEventsDto } from './dto/get-events.dto';
import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getEvents(getEventsDto: GetEventsDto): Promise<{
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
