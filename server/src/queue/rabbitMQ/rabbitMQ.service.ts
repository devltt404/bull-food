import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { CreateChannelOpts } from 'amqp-connection-manager';
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager';

@Injectable()
export class RabbitMQService {
  private connection: IAmqpConnectionManager;
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(private readonly configService: ConfigService) {
    this.connection = amqp.connect([
      this.configService.getOrThrow('rabbitmq.uri'),
    ]);
    this.connection.on('connect', () => {
      this.logger.log('Connected to RabbitMQ');
    });
  }

  createChannel(options?: CreateChannelOpts) {
    return this.connection.createChannel(options);
  }
}
