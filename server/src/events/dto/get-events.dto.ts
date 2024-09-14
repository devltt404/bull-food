import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsOptional } from 'class-validator';
import { EventsCampus, EventsSortBy } from '../enum/events.enum';

export class GetEventsDto {
  @IsEnum(EventsCampus, {
    message: `Campus must be one of ${Object.values(EventsCampus).join(', ')}`,
  })
  @IsOptional()
  campus?: EventsCampus;

  @IsISO8601()
  @IsOptional()
  fromDate?: string;

  @IsISO8601()
  @IsOptional()
  toDate?: string;

  @Type(() => Number)
  @IsInt()
  limit: number = 40;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  range: number = 0;

  @IsEnum(EventsSortBy, {
    message: `Sort by must be one of ${Object.values(EventsSortBy).join(', ')}`,
  })
  @IsOptional()
  sortBy: EventsSortBy = EventsSortBy.time;
}
