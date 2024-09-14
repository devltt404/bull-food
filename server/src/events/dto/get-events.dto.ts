import { IsDate, IsEnum, IsInt } from 'class-validator';

export class GetEventsDto {
  @IsEnum(['Tampa', 'St Petersburg', 'Sarasota-Manatee'], {
    message:
      'Campus must be one of "Tampa", "St Petersburg", or "Sarasota-Manatee"',
  })
  campus: 'Tampa' | 'St Petersburg' | 'Sarasota-Manatee';

  @IsDate()
  fromDate: Date;

  @IsDate()
  toDate: Date;

  @IsInt()
  limit: number;

  @IsInt()
  from: number;
}
