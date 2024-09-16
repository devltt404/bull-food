import { BullsConnectService } from 'src/bullsconnect/bullsconnect.service';
import { GetEventsDto } from './dto/get-events.dto';
export declare class EventsService {
    private readonly bullsConnectService;
    constructor(bullsConnectService: BullsConnectService);
    getEvents({ campus, fromDate, range, limit, toDate, sortBy, }: GetEventsDto): Promise<{
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
    }>;
}
