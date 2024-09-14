import { Controller, Get, Query } from '@nestjs/common';
import { GetEventsDto } from './dto/get-events.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(@Query() getEventsDto: GetEventsDto) {
    return this.eventsService.getEvents(getEventsDto);
  }
}
