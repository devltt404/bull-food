import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { FetchedEvent } from '../events/interfaces/event.interface';
import { FetchEventsDto } from './dto/fetch-events.dto';
export declare class BullsConnectService {
    private readonly configService;
    private schedulerRegistry;
    constructor(configService: ConfigService, schedulerRegistry: SchedulerRegistry);
    private readonly logger;
    fetchEvents(params: FetchEventsDto): Promise<FetchedEvent[]>;
    maintainSession(): Promise<void>;
}
