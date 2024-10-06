import { Injectable } from '@nestjs/common';
import { parse } from 'node-html-parser';
import { BullsConnectApiService } from 'src/bullsconnect/infrastructure/api/bullsconnect-api.service';
import { FetchEventsDto } from 'src/bullsconnect/infrastructure/api/dto/fetch-events.dto';
import { FetchedEvent } from 'src/bullsconnect/infrastructure/api/interfaces/fetched-events.interface';
import { formatDDMMMYYYY } from 'src/utils/format-date';
import { getEventImageSrc } from 'src/utils/get-event-image-src';
import { parseEventHTML, parseFetchedEvents } from 'src/utils/parse-events';
import { EventResponseDto, EventsResponseDto } from './dto/events-response.dto';
import { GetEventsDto } from './dto/get-events.dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly bullsConnectApiService: BullsConnectApiService,
  ) {}

  async getEvents({
    range = 0,
    limit = 40,
    campus,
    fromDate,
    toDate,
    searchWord,
  }: GetEventsDto): Promise<EventsResponseDto[]> {
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
      await this.bullsConnectApiService.fetchEventsList(queryParams);

    // Filter date separators and events that are not on the specified campus
    const filteredEvents = fetchEventData.filter((event) => {
      return (
        !event.listingSeparator &&
        'p22' in event &&
        (!campus || event.p22.includes(`Campus - ${campus}`))
      );
    }) as FetchedEvent[];

    return parseFetchedEvents(filteredEvents);
  }

  async getFeaturedEvents({
    limit,
    campus,
    fromDate,
    toDate,
  }: GetEventsDto): Promise<EventsResponseDto[]> {
    // ⚠️ BullsConnect API does not support sorting by "going" count, so we have to fetch 100 upcoming events and sort them manually
    const events = await this.getEvents({
      campus,
      limit: 100,
      fromDate,
      toDate,
    });

    events.sort((a, b) => b.going - a.going);
    return events.slice(0, limit);
  }

  async getEvent(id: string): Promise<EventResponseDto> {
    const root = parse(await this.bullsConnectApiService.fetchEvent(id));

    const parsedEventData = parseEventHTML(root);

    return {
      id,
      image: getEventImageSrc(parsedEventData.image),
      title: parsedEventData.title || 'Food Event at USF',
      timeInfo1: parsedEventData.timeInfo1 || 'TBD',
      timeInfo2: parsedEventData.timeInfo2,
      location: {
        name: parsedEventData.location.name || 'TBD',
        address: parsedEventData.location.address,
      },
      tags: parsedEventData.tags,
      organizer: parsedEventData.organizer || 'USF',
      going: parsedEventData.going || 0,
      details: {
        image:
          parsedEventData.details.image &&
          getEventImageSrc(parsedEventData.details.image),
        description: parsedEventData.details.description || 'No description',
      },
    };
  }
}
