import { IsOptional } from 'class-validator';
import { EventCampus } from 'src/events/constants/event.constant';
import { IsEventCampus } from 'src/events/decorators/is-event-campus.decorator';

export class FilterSubscriberDto {
  @IsOptional()
  @IsEventCampus()
  campus?: EventCampus;
}
