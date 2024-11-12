import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import path from 'path';
import { EventCampus } from 'src/events/constants/event.constant';
import { EventsService } from 'src/events/events.service';
import { QueueProducerService } from 'src/queue/queue-producer.service';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { Subscriber } from 'src/subscribers/schemas/subscriber.schema';
import { SubscriberService } from 'src/subscribers/subscriber.service';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly eventsSerivce: EventsService,
    private readonly configService: ConfigService,
    private readonly queueProducerService: QueueProducerService,
  ) {}

  async subscribe(subscribeNewsletterDto: CreateSubscriberDto) {
    let existSubscriber = await this.subscriberService.findByEmail(
      subscribeNewsletterDto.email,
    );
    if (existSubscriber) {
      throw new ConflictException('Email already subscribed to newsletter.');
    }

    let subscriber = await this.subscriberService.create(
      subscribeNewsletterDto,
    );

    if (subscriber) {
      const today = new Date().toISOString();

      await this.sendNewsletter({
        subscribers: [
          {
            email: subscriber.email,
            unsubscribeToken: subscriber.unsubscribeToken,
          },
        ],
        campus: subscriber.campus,
        fromDate: today,
        toDate: today,
      });

      return subscriber;
    } else {
      throw new InternalServerErrorException('Failed to subscribe');
    }
  }

  async unsubscribe(token: string) {
    return this.subscriberService.removeByToken(token);
  }

  /**
   * Send newsletter of featured events to subscribers at specified campus in the given date range.
   */
  async sendNewsletter({
    subscribers,
    campus,
    fromDate,
    toDate,
  }: {
    subscribers: Pick<Subscriber, 'email' | 'unsubscribeToken'>[];
    campus: EventCampus;
    fromDate: string;
    toDate: string;
  }) {
    if (subscribers.length === 0) return;

    const events = await this.eventsSerivce.getFeaturedEvents({
      limit: 5,
      fromDate,
      toDate,
      campus,
    });
    try {
      const addToQueuePromises = subscribers.map(
        ({ email, unsubscribeToken }) => {
          return this.queueProducerService.addToEmailQueue({
            to: email,
            subject: `USF free food events on ${new Date().toLocaleDateString()}`,
            templatePath: path.join(
              process.cwd(),
              'src/mail/templates/daily-newsletter.hbs',
            ),
            context: {
              events,
              unsubUrl: `${this.configService.get('app.clientBaseUrl')}/unsubscribe/${unsubscribeToken}`,
            },
          });
        },
      );

      await Promise.all(addToQueuePromises);
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * Send daily newsletter to all subscribers at 8:00 AM EDT.
   */
  @Cron(CronExpression.EVERY_DAY_AT_8AM, {
    timeZone: 'America/New_York',
  })
  async sendDailyNewsletter() {
    this.logger.log('✉️ Start sending daily newsletter...');

    const subcribers = await this.subscriberService.findAll({});

    const subscribersByCampus = {};
    Object.values(EventCampus).forEach((campus) => {
      subscribersByCampus[campus] = [];
    });
    for (const subscriber of subcribers) {
      subscribersByCampus[subscriber.campus].push(subscriber);
    }

    const today = new Date().toISOString();

    const sendNewsletterPromises = Object.values(EventCampus).map((campus) => {
      return this.sendNewsletter({
        subscribers: subscribersByCampus[campus],
        campus,
        fromDate: today,
        toDate: today,
      });
    });
    await Promise.all(sendNewsletterPromises);
  }
}
