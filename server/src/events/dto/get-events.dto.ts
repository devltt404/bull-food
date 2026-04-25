import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { isDDMMMYYYY } from 'src/utils/decorators/is-DDMMMYYYY.decorator';

export class GetEventsDto {
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
