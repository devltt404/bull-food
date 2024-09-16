import { Module } from '@nestjs/common';
import { BullsConnectModule } from 'src/bullsconnect/bullsconnect.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [BullsConnectModule],
  exports: [EventsService],
})
export class EventsModule {}
