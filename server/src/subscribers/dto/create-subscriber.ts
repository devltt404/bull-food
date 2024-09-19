import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { EventCampus } from 'src/events/constants/event.constant';
import { IsEventCampus } from 'src/events/decorators/is-event-campus.decorator';
import { lowerAndTrimTransformer } from 'src/utils/transformers/lower-and-trim.transformer';

export class CreateSubscriberDto {
  @IsEmail()
  @Transform(lowerAndTrimTransformer)
  email: string;

  @IsEventCampus()
  campus: EventCampus;
}
