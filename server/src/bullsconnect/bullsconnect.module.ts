import { Module } from '@nestjs/common';
import { BullsConnectService } from './bullsconnect.service';

@Module({
  providers: [BullsConnectService],
  exports: [BullsConnectService],
})
export class BullsConnectModule {}
