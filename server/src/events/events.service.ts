import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetEventsDto } from './dto/get-events.dto';
import { FetchedEvent } from './interfaces/events.interface';

@Injectable()
export class EventsService {
  async getEvents({ campus, fromDate, from, limit, toDate }: GetEventsDto) {
    const { data: fetchedEvents }: { data: FetchedEvent[] } = await axios.get(
      'https://bullsconnect.usf.edu/mobile_ws/v17/mobile_events_list',
      {
        params: {
          range: 0,
          from,
          limit,
          filter6: '7276307', //Food event tag
          filter8: fromDate,
          filter9: toDate,
        },
        headers: {
          Cookie:
            'CG.SessionID=auogrbmlqmpbfk5v1qqx0axs-lZpFx7E5K8XyfyczzyktnltPk1M%3d',
        },
      },
    );

    const filteredEvents = fetchedEvents.filter((event) => {
      return event.listingSeparator || event.p22.includes('Campus - ' + campus);
    });

    let totalEvents = 0;

    const events = filteredEvents.map((event) => {
      if (event.listingSeparator)
        return {
          listingSeparator: true,
          time: event.p1,
        };
      totalEvents++;
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
        image: `https://bullsconnect.usf.edu${event.p5}`,
        location: event.p6,
        going: event.p10,
        isSoldOut: event.p26?.includes('SOLD-OUT'),
        spotsLeft: event.p26?.match(/>(\d+)<\/span>/)?.[1],
      };
    });

    return { events, totalEvents };
  }
}
