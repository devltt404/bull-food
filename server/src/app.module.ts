import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullsConnectModule } from './bullsconnect/bullsconnect.module';
import bullsconnectConfig from './bullsconnect/config/bullsconnect.config';
import serverConfig from './config/server.config';
import { EventsModule } from './events/events.module';
import mailConfig from './mail/config/mail.config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [serverConfig, bullsconnectConfig, mailConfig],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    EventsModule,
    BullsConnectModule,
    MailModule,
  ],
})
export class AppModule {}
