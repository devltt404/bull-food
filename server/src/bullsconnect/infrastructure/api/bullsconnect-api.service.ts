import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import {
  FetchedDateSeparator,
  FetchedEvent,
} from '../../../events/interfaces/event.interface';
import { BullsConnectHttpService } from '../http/bullsconnect-http.service';
import { FetchEventsDto } from './dto/fetch-events.dto';

@Injectable()
export class BullsConnectApiService {
  private readonly logger = new Logger(BullsConnectApiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly bullsConnectHttpService: BullsConnectHttpService,
  ) {}

  async fetchEvents(params: FetchEventsDto) {
    /**
     * The api returns an array of events and date separators.
     */
    const { data }: { data: (FetchedEvent | FetchedDateSeparator)[] } =
      await this.bullsConnectHttpService.get('mobile_events_list', {
        params,
        headers: {
          Cookie:
            'CG.SessionID=' + this.configService.get('bullsconnect.sessionId'),
        },
      });
    return data;
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'maintainSession',
    utcOffset: -4, // UTC-4 (EDT)
  })
  async maintainSession() {
    this.logger.log('Start maintaining BullsConnect session');

    try {
      const { data }: { data: FetchedEvent[] } =
        await this.bullsConnectHttpService.get('mobile_events_list', {
          params: {
            limit: 10,
          },
          headers: {
            Cookie:
              'CG.SessionID=' +
              this.configService.get('bullsconnect.sessionId'),
          },
        });

      const sessionExpired = data.some((event) =>
        event.p6?.includes('Private Location (sign in to display)'),
      );

      if (sessionExpired) {
        this.logger.error('Session expired. Please update the session ID.');
        this.schedulerRegistry.getCronJob('maintainSession').stop();
        this.logger.warn('BullsConnect session maintenance stopped');
      } else {
        this.logger.log('BullsConnect session is still valid');
      }
    } catch (error) {
      this.logger.error('Failed to maintain BullsConnect session', error.stack);
    }
  }
}
