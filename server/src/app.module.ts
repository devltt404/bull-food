import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { BullsConnectModule } from './bullsconnect/bullsconnect.module';
import bullsconnectConfig from './bullsconnect/config/bullsconnect.config';
import { CacheModule } from './cache/cache.module';
import appConfig from './config/app.config';
import databaseConfig from './database/database.config';
import { EventsModule } from './events/events.module';
import mailConfig from './mail/config/mail.config';
import { MailModule } from './mail/mail.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import redisConfig from './redis/config/redis.config';

@Module({
  imports: [
    CacheModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db.uri'),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [
        appConfig,
        bullsconnectConfig,
        mailConfig,
        redisConfig,
        databaseConfig,
      ],
      isGlobal: true,
      envFilePath: [
        `${process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'}`,
      ],
    }),
    EventsModule,
    BullsConnectModule,
    MailModule,
    NewsletterModule,
    CacheModule,
  ],
})
export class AppModule {}
