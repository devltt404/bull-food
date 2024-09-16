import { IsEnum, IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { CampusId } from '../constants/campus-id.constant';

export class FetchEventsDto {
  @IsNumber()
  range: number;

  @IsNumber()
  limit: number;

  @IsEnum(CampusId, {
    message: `Campus id must be one of ${Object.values(CampusId).join(', ')}`,
  })
  filter6?: string; // campus id

  @IsOptional()
  @IsISO8601()
  filter8?: string; // fromDate

  @IsOptional()
  @IsISO8601()
  filter9?: string; // toDate
}
