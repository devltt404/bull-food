import { Controller, Get, Query } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { GetEventsDto } from './dto/get-events.dto';
import { EventsService } from './events.service';

@Controller({
  path: 'events',
  version: '1',
})
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly cacheService: CacheService,
  ) {}

  @Get()
  async getEvents(@Query() getEventsDto: GetEventsDto) {
    const cacheKey = JSON.stringify(getEventsDto);

    let cachedEvents = await this.cacheService.get(cacheKey);
    cachedEvents = cachedEvents && JSON.parse(cachedEvents);

    if (!cachedEvents) {
      const events = await this.eventsService.getEvents(getEventsDto);
      await this.cacheService.set(cacheKey, JSON.stringify(events), 1000 * 300);
      return events;
    }

    return cachedEvents;
  }

  @Get('featured')
  async getFeaturedEvents(@Query() getEventsDto: GetEventsDto) {
    const cacheKey = JSON.stringify(getEventsDto);
    
    let cachedEvents = await this.cacheService.get(cacheKey);
    cachedEvents = cachedEvents && JSON.parse(cachedEvents);

    if (!cachedEvents) {
      const events = await this.eventsService.getFeaturedEvents(getEventsDto);
      await this.cacheService.set(cacheKey, events, 1000 * 300);
      return events;
    }

    return cachedEvents;
  }
}
