import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { isDDMMMYYYY } from 'src/utils/decorators/is-DDMMMYYYY.decorator';
import { EventCampus } from '../constants/event.constant';
import { IsEventCampus } from '../decorators/is-event-campus.decorator';

export class GetEventsDto {
  @IsEventCampus()
  campus: EventCampus;

  @IsOptional()
  @isDDMMMYYYY()
  fromDate?: string;

  @IsOptional()
  @isDDMMMYYYY()
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
