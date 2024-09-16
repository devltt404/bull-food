import { Injectable } from '@nestjs/common';
import { BullsConnectService } from 'src/bullsconnect/bullsconnect.service';
import formatDate from 'src/utils/format-date';
import { EventCampusId, EventSortBy } from './constants/event.constant';
import { GetEventsDto } from './dto/get-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly bullsConnectService: BullsConnectService) {}

  async getEvents({
    campus,
    fromDate,
    range,
    limit,
    toDate,
    sortBy,
  }: GetEventsDto) {
    const queryParams = {
      range,
      limit,
      filter6: EventCampusId[campus],
    };

    if (fromDate) {
      queryParams['filter8'] = formatDate(fromDate);
    }
    if (toDate) {
      queryParams['filter9'] = formatDate(toDate);
    }

    const fetchedEvents =
      await this.bullsConnectService.fetchEvents(queryParams);

    // Filter events by campus
    const filteredEvents = fetchedEvents.filter((event) => {
      return (
        !event.listingSeparator &&
        (!campus || event.p22.includes(`Campus - ${campus}`))
      );
    });

    const events = filteredEvents.map((event) => {
      const dateMatch = event.p4?.match(/(\w{3}, \w{3} \d{1,2}, \d{4})/);
      const timeMatch = event.p4?.match(
        /(\d{1,2}(?::\d{2})?\s[APM]{2})\s&ndash;\s(\d{1,2}(?::\d{2})?\s[APM]{2})/,
      );

      return {
        id: event.p1,
        title: event.p3,
        date: dateMatch?.[0],
        startTime: timeMatch?.[1],
        endTime: timeMatch?.[2],
        image: `https://bullsconnect.usf.edu${event.p11}`,
        location: event.p6,
        going: parseInt(event.p10),
        isSoldOut: event.p26?.includes('SOLD-OUT'),
        spotsLeft: parseInt(event.p26?.match(/>(\d+)<\/span>/)?.[1]) || null,
      };
    });

    if (sortBy === EventSortBy.participants) {
      events.sort((a, b) => {
        return b.going - a.going;
      });
    }
    return { events };
  }
}
