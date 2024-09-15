import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class BullsConnectService {
    private readonly configService;
    private schedulerRegistry;
    constructor(configService: ConfigService, schedulerRegistry: SchedulerRegistry);
    private readonly logger;
    maintainSession(): Promise<void>;
}
