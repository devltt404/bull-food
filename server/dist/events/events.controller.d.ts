import { GetEventsDto } from './dto/get-events.dto';
import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getEvents(getEventsDto: GetEventsDto): Promise<{
        message: string;
        data: {
            events: {
                id: string;
                title: string;
                date: string;
                startTime: string;
                endTime: string;
                image: string;
                location: string;
                going: number;
                isSoldOut: boolean;
                spotsLeft: number;
            }[];
        };
    }>;
}
