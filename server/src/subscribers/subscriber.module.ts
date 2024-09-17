import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberRepository } from './infrastructure/persistence/subscriber.repository';
import {
  SubscriberSchema,
  SubscriberSchemaClass,
} from './infrastructure/persistence/subscriber.schema';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubscriberSchemaClass.name,
        schema: SubscriberSchema,
      },
    ]),
  ],
  providers: [SubscriberRepository, SubscriberService],
  exports: [SubscriberService],
})
export class SubscriberModule {}
