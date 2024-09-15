import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullsConnectModule } from './bullsconnect/bullsconnect.module';
import bullsconnectConfig from './bullsconnect/config/bullsconnect.config';
import serverConfig from './config/server.config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [serverConfig, bullsconnectConfig],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    EventsModule,
    BullsConnectModule,
  ],
})
export class AppModule {}
