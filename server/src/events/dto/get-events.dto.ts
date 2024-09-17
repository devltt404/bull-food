import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsOptional } from 'class-validator';
import { EventCampus } from '../constants/event.constant';
import { IsEventCampus } from '../decorators/event-campus.decorator';

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
  limit?: number = 40;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  range?: number = 0;
}
