import { Controller, Get, Query } from '@nestjs/common';
import { GetEventsDto } from './dto/get-events.dto';
import { EventsService } from './events.service';

@Controller({
  path: 'events',
  version: '1',
})
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents(@Query() getEventsDto: GetEventsDto) {
    return await this.eventsService.getEvents(getEventsDto);
  }

  @Get('featured')
  async getFeaturedEvents(@Query() getEventsDto: GetEventsDto) {
    return await this.eventsService.getFeaturedEvents(getEventsDto);
  }
}
