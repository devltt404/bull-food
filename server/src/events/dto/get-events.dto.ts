import { Transform, Type } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  searchWord?: string;
}
