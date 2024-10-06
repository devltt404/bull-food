import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BullsConnectHttpService } from '../http/bullsconnect-http.service';
import { FetchEventsDto } from './dto/fetch-events.dto';
import {
  FetchedDateSeparator,
  FetchedEvent,
} from './interfaces/fetched-events.interface';

@Injectable()
export class BullsConnectApiService {
  private readonly logger = new Logger(BullsConnectApiService.name);

  constructor(
    private readonly bullsConnectHttpService: BullsConnectHttpService,
  ) {}

  /**
   * ⚠️ BullsConnect API Fetch Events List Limitations ⚠️
   *
   * 1. Mixed Array Response:
   *    - The API returns an array containing both events and date separators.
   *
   * 2. Duplicate Events in Pagination:
   *    - Paginated fetch requests can result in duplicate events with the same ID.
   *    - Example: Fetching with `range = 0` and `limit = 10`, followed by `range = 10` and `limit = 10`,
   *      may return some events with the same ID in both responses.
   *
   *  3. Lack of Sorting Options:
   *    - The API does not provide any options for sorting the events list.
   *
   *  4. Limited Filter Options:
   *    - You cannot apply more than two filter options in a single request.
   *    - Example: you cannot filter for events that have both "food" and "campus-tampa" tags simultaneously.
   *
   *  5. Response Time:
   *    - The API response time is typically slow (typically 1s - 2s).
   *
   *  6. JSON Response Format:
   *    - The API returns individual event details as key-value pairs representing
   *      different sections of HTML content, requiring additional parsing to retrieve structured data
   */
  async fetchEventsList(
    params: FetchEventsDto,
  ): Promise<(FetchedEvent | FetchedDateSeparator)[]> {
    const { data }: { data: (FetchedEvent | FetchedDateSeparator)[] } =
      await this.bullsConnectHttpService.get(
        '/mobile_ws/v17/mobile_events_list',
        {
          params,
        },
      );
    return data;
  }

  /**
   * ⚠️ BullsConnect API fetch event Limitations ⚠️
   *
   * 1. HTML Response Format
   * 2. Slow Response Time (typically 1s - 2s)
   */
  async fetchEvent(id: string): Promise<string> {
    const { data }: { data: string } = await this.bullsConnectHttpService.get(
      'rsvp_boot',
      {
        params: {
          id,
        },
      },
    );

    return data;
  }

  // Call every 30 minutes to maintain the session id validity
  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'maintainSession',
  })
  async maintainSession() {
    this.logger.log('Start maintaining BullsConnect session');

    try {
      await this.fetchEventsList({});

      this.logger.log('BullsConnect session maintained');
    } catch (error) {
      this.logger.error('Failed to maintain BullsConnect session', error.stack);
    }
  }
}
