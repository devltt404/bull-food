import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [EventsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
