import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class FetchEventsDto {
  @IsNumber()
  range: number;

  @IsNumber()
  limit: number;

  @IsOptional()
  @IsISO8601()
  filter8?: string; // fromDate

  @IsOptional()
  @IsISO8601()
  filter9?: string; // toDate
}
