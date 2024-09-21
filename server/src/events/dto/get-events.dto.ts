import { Type } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional } from 'class-validator';
import { EventCampus } from '../constants/event.constant';
import { IsEventCampus } from '../decorators/is-event-campus.decorator';

export class GetEventsDto {
  @IsEventCampus()
  campus: EventCampus;

  @IsOptional()
  @IsISO8601()
  fromDate?: string;

  @IsOptional()
  @IsISO8601()
  toDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  range?: number;
}
