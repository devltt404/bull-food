import { Controller, Get, Param, Query, Request } from '@nestjs/common';
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
  async getEvents(
    @Request() req: Request,
    @Query() getEventsDto: GetEventsDto,
  ) {
    return await this.cacheService.getOrSet({
      key: req.url,
      ttl: 300000, // 5 minutes
      getter: async () => {
        return await this.eventsService.getEvents(getEventsDto);
      },
    });
  }

  @Get('featured')
  async getFeaturedEvents(
    @Request() req: Request,
    @Query() getEventsDto: GetEventsDto,
  ) {
    return await this.cacheService.getOrSet({
      key: req.url,
      ttl: 300000, // 5 minutes
      getter: async () => {
        return await this.eventsService.getFeaturedEvents(getEventsDto);
      },
    });
  }

  @Get(':id')
  async getEvent(@Request() req: Request, @Param('id') id: string) {
    return await this.eventsService.getEvent(id);
  }
}
