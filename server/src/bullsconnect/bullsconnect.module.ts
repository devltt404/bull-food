import { Module } from '@nestjs/common';
import { BullsConnectApiService } from './infrastructure/api/bullsconnect.service';

@Module({
  providers: [BullsConnectApiService],
  exports: [BullsConnectApiService],
})
export class BullsConnectModule {}
