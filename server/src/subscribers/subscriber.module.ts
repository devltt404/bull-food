import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriberRepository } from './repositories/subscriber.repository';
import { Subscriber, SubscriberSchema } from './schemas/subscriber.schema';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subscriber.name,
        schema: SubscriberSchema,
      },
    ]),
  ],
  providers: [SubscriberRepository, SubscriberService],
  exports: [SubscriberService],
})
export class SubscriberModule {}
