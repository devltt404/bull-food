import { Module } from '@nestjs/common';
import { BullsConnectService } from './bullsconnect.service';

@Module({
  providers: [BullsConnectService],
})
export class BullsConnectModule {}
