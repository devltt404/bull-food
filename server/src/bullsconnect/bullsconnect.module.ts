import { Module } from '@nestjs/common';
import { BullsConnectApiService } from './infrastructure/api/bullsconnect-api.service';
import { BullsConnectHttpService } from './infrastructure/http/bullsconnect-http.service';

@Module({
  providers: [BullsConnectApiService, BullsConnectHttpService],
  exports: [BullsConnectApiService],
})
export class BullsConnectModule {}
