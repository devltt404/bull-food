import { ConfigService } from '@nestjs/config';
import { GetEventsDto } from './dto/get-events.dto';
export declare class EventsService {
    private readonly configService;
    constructor(configService: ConfigService);
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
