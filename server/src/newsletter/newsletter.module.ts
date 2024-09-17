import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { MailModule } from 'src/mail/mail.module';
import { SubscriberModule } from 'src/subscribers/subscriber.module';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
  imports: [SubscriberModule, EventsModule, MailModule],
})
export class NewsletterModule {}
