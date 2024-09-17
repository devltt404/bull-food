import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { MailService } from './mail.service';

@Module({
  imports: [EventsModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
