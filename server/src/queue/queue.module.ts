import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { QueueConsumerService } from './queue-consumer.service';
import { QueueProducerService } from './queue-producer.service';
import { RabbitMQService } from './rabbitMQ/rabbitMQ.service';

@Module({
  imports: [MailModule],
  providers: [QueueConsumerService, QueueProducerService, RabbitMQService],
  exports: [QueueProducerService],
})
export class QueueModule {}
