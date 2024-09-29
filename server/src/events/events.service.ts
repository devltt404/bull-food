import { Injectable } from '@nestjs/common';
import { BullsConnectApiService } from 'src/bullsconnect/infrastructure/api/bullsconnect-api.service';
import { FetchEventsDto } from 'src/bullsconnect/infrastructure/api/dto/fetch-events.dto';
import { formatDDMMMYYYY } from 'src/utils/format-date';
import { GetEventsDto } from './dto/get-events.dto';
import { FetchedEvent } from './interfaces/event.interface';

@Injectable()
export class EventsService {
  constructor(
    private readonly bullsConnectApiService: BullsConnectApiService,
  ) {}

  /**
   * Maps fetched events from BullsConnect API to a more readable and computable format
   */
  private mapEvents(fetchedEvents: FetchedEvent[]) {
    return fetchedEvents.map((event) => {
      let date: string | null = null;
      let startTime: string | null = null;
      let endTime: string | null = null;
      let startDate: string | null = null;
      let endDate: string | null = null;

      const multipleDateReg =
        /(?<startDate>\w{3}, \w{3} \d{1,2}, \d{4})\s(?<startTime>\d{1,2}(?::\d{2})? [APM]{2})\s&ndash;\s.*?(?<endDate>\w{3}, \w{3} \d{1,2}, \d{4})\s(?<endTime>\d{1,2}(?::\d{2})? [APM]{2})/;
      const oneDateReg =
        /(?<date>\w{3}, \w{3} \d{1,2}, \d{4}).*?(?<startTime>\d{1,2}(?::\d{2})? [APM]{2})\s&ndash;\s(?<endTime>\d{1,2}(?::\d{2})? [APM]{2})/;

      const multipleDateData = event.p4.match(multipleDateReg)?.groups as {
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
      };

      if (multipleDateData) {
        ({ startDate, startTime, endDate, endTime } = multipleDateData);
      } else {
        const singleDateData = event.p4.match(oneDateReg)?.groups as {
          date: string;
          startTime: string;
          endTime: string;
        };
        if (singleDateData) {
          ({ date, startTime, endTime } = singleDateData);
        }
      }

      return {
        id: event.p1,
        title: event.p3,
        date,
        startDate,
        endDate,
        startTime,
        endTime,
        image: `https://bullsconnect.usf.edu${event.p11}`,
        location: event.p6,
        going: parseInt(event.p10),
      };
    });
  }

  async getEvents({
    range = 0,
    limit = 40,
    campus,
    fromDate,
    toDate,
    searchWord,
  }: GetEventsDto) {
    const queryParams: FetchEventsDto = {
      range,
      limit,
      filter6: '7276307', //Food event tag
    };

    if (searchWord) {
      queryParams['search_word'] = searchWord;
    }
    if (fromDate) {
      queryParams['filter8'] = formatDDMMMYYYY(fromDate);
    }
    if (toDate) {
      queryParams['filter9'] = formatDDMMMYYYY(toDate);
    }

    const fetchEventData =
      await this.bullsConnectApiService.fetchEvents(queryParams);

    // Filter date separators and events that are not on the specified campus
    const filteredEvents = fetchEventData.filter((event) => {
      return (
        !event.listingSeparator &&
        'p22' in event &&
        (!campus || event.p22.includes(`Campus - ${campus}`))
      );
    }) as FetchedEvent[];

    return this.mapEvents(filteredEvents);
  }

  async getFeaturedEvents({ limit, campus, fromDate, toDate }: GetEventsDto) {
    // BullsConnect API does not support sorting by going count, so we have to fetch 100 events and sort them manually
    const events = await this.getEvents({
      campus,
      limit: 100,
      fromDate,
      toDate,
    });

    events.sort((a, b) => b.going - a.going);
    return events.slice(0, limit);
  }
}
