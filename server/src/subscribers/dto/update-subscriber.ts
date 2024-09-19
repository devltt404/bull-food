import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { EventCampus } from 'src/events/constants/event.constant';
import { IsEventCampus } from 'src/events/decorators/is-event-campus.decorator';
import { lowerAndTrimTransformer } from 'src/utils/transformers/lower-and-trim.transformer';


class UpdatePayloadDto {
  @IsOptional()
  @IsEmail()
  @Transform(lowerAndTrimTransformer)
  email?: string;

  @IsOptional()
  @IsEventCampus()
  campus?: EventCampus;

  @IsOptional()
  @IsBoolean()
  isSubscribed?: boolean;
}

export class UpdateSubscriberByIdDto {
  @IsUUID()
  id: string;

  @Type(() => UpdatePayloadDto)
  payload: UpdatePayloadDto;
}

export class UpdateSubscriberByEmailDto {
  @IsEmail()
  @Transform(lowerAndTrimTransformer)
  email: string;

  @Type(() => UpdatePayloadDto)
  payload: UpdatePayloadDto;
}
