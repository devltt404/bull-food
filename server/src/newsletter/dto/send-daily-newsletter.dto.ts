import { Type } from 'class-transformer';
import { IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { EventCampus } from 'src/events/constants/event.constant';
import { IsEventCampus } from 'src/events/decorators/event-campus.decorator';

export class NewsletterSubscriber {
  @IsEmail()
  email: string;

  @IsEventCampus()
  campus: EventCampus;
}

export class SendDailyNewsletterDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NewsletterSubscriber)
  subscribers?: NewsletterSubscriber[];
}
