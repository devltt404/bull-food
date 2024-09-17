import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { EventCampus } from 'src/events/constants/event.constant';
import { IsEventCampus } from 'src/events/decorators/event-campus.decorator';

export class SubscribeNewsletterDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsEventCampus()
  campus: EventCampus;
}
