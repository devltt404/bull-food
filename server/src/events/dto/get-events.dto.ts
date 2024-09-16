import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsOptional } from 'class-validator';
import { EventCampus, EventSortOption } from '../constants/event.constant';

export class GetEventsDto {
  @IsEnum(EventCampus, {
    message: `Campus must be one of ${Object.values(EventCampus).join(', ')}`,
  })
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

  @IsOptional()
  @IsEnum(EventSortOption, {
    message: `Sort by must be one of ${Object.values(EventSortOption).join(', ')}`,
  })
  sortBy?: EventSortOption = EventSortOption.time;
}
