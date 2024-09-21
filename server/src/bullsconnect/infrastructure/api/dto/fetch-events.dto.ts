import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class FetchEventsDto {
  @IsNumber()
  range: number;

  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  filter6?: string;

  @IsOptional()
  @IsISO8601()
  filter8?: string; // fromDate

  @IsOptional()
  @IsISO8601()
  filter9?: string; // toDate

  @IsOptional()
  @IsString()
  search_word?: string;
}
