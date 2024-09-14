import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import bullsconnectConfig from './bullsconnect/config/bullsconnect.config';
import serverConfig from './config/server.config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, bullsconnectConfig],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    EventsModule,
  ],
})
export class AppModule {}
