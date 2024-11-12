import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { SendMailData } from 'src/mail/interfaces/send-mail.interface';
import { MailService } from 'src/mail/mail.service';
import { QueueName } from './constants/queue.constant';
import { RabbitMQService } from './rabbitMQ/rabbitMQ.service';

@Injectable()
export class QueueConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(QueueConsumerService.name);

  constructor(
    private readonly mailService: MailService,
    private readonly rabbitMQService: RabbitMQService,
  ) {
    this.channelWrapper = this.rabbitMQService.createChannel();
  }

  async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue(QueueName.Email, { durable: true });
        await channel.consume(QueueName.Email, async (msg) => {
          if (msg) {
            const data: SendMailData = JSON.parse(msg.content.toString());
            this.logger.log(
              `Received message from ${QueueName.Email}: ${data.to}`,
            );
            await this.mailService.sendMail(data);
            channel.ack(msg);
          }
        });
      });

      this.logger.log('Queue consumer started');
    } catch (error) {
      this.logger.error('Failed to start queue consumer:', error);
    }
  }
}
