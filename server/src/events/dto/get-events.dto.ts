import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsOptional } from 'class-validator';
import { EventsCampus, EventsSortBy } from '../enum/events.enum';

export class GetEventsDto {
  @IsEnum(EventsCampus, {
    message: `Campus must be one of ${Object.values(EventsCampus).join(', ')}`,
  })
  @IsOptional()
  campus?: EventsCampus;

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
  @IsEnum(EventsSortBy, {
    message: `Sort by must be one of ${Object.values(EventsSortBy).join(', ')}`,
  })
  sortBy?: EventsSortBy = EventsSortBy.time;
}
