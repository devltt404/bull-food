import KeyvRedis from '@keyv/redis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import { CacheService } from './cache.service';

@Module({
  providers: [
    {
      provide: 'KEYV_INSTANCE',
      useFactory: (configService: ConfigService) => {
        return new Keyv({
          store: new KeyvRedis(configService.get('redis.uri')!),
        });
      },
      inject: [ConfigService],
    },
    CacheService,
  ],
  exports: ['KEYV_INSTANCE', CacheService],
})
export class CacheModule {}
