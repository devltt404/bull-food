import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { SendMailData } from 'src/mail/interfaces/send-mail.interface';
import { QueueName } from './constants/queue.constant';
import { RabbitMQService } from './rabbitMQ/rabbitMQ.service';

@Injectable()
export class QueueProducerService {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(QueueProducerService.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {
    this.channelWrapper = this.rabbitMQService.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(QueueName.Email, { durable: true });
      },
    });
  }

  async addToEmailQueue(data: SendMailData) {
    try {
      this.logger.log('Adding to email queue: ' + data.to);

      await this.channelWrapper.sendToQueue(
        QueueName.Email,
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to add to newsletter queue',
      );
    }
  }
}
