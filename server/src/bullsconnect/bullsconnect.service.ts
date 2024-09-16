import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios';
import { FetchedEvent } from '../events/interfaces/event.interface';
import { FetchEventsDto } from './dto/fetch-events.dto';

@Injectable()
export class BullsConnectService {
  constructor(
    private readonly configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(BullsConnectService.name);

  async fetchEvents(params: FetchEventsDto) {
    const { data }: { data: FetchedEvent[] } = await axios.get(
      'https://bullsconnect.usf.edu/mobile_ws/v17/mobile_events_list',
      {
        params,
        headers: {
          Cookie:
            'CG.SessionID=' + this.configService.get('bullsconnect.sessionId'),
        },
      },
    );

    return data;
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'maintainSession',
  })
  async maintainSession() {
    this.logger.log('Start maintaining BullsConnect session');

    try {
      const { data }: { data: FetchedEvent[] } = await axios.get(
        'https://bullsconnect.usf.edu/mobile_ws/v17/mobile_events_list',
        {
          params: {
            limit: 10,
          },
          headers: {
            Cookie:
              'CG.SessionID=' +
              this.configService.get('bullsconnect.sessionId'),
          },
        },
      );

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
