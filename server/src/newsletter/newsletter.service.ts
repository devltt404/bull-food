import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import path from 'path';
import { EventCampus } from 'src/events/constants/event.constant';
import { EventsService } from 'src/events/events.service';
import { MailService } from 'src/mail/mail.service';
import { Subscriber } from 'src/subscribers/domain/subscriber.entity';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { SubscriberService } from 'src/subscribers/subscriber.service';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly eventsSerivce: EventsService,
    private readonly mailService: MailService,
  ) {}

  async subscribe(subscribeNewsletterDto: CreateSubscriberDto) {
    let subscriber: Subscriber | null;

    try {
      subscriber = await this.subscriberService.create(subscribeNewsletterDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already subscribed to newsletter.');
      }

      throw error;
    }

    if (subscriber) {
      this.sendDailyNewsletter([subscriber]); // Send newsletter to new subscriber
      return subscriber;
    } else {
      throw new InternalServerErrorException('Failed to subscribe');
    }
  }

  async unsubscribe(email: string) {
    const subscriber = await this.subscriberService.updateByEmail({
      email,
      payload: { isSubscribed: false },
    });

    if (!subscriber) {
      throw new NotFoundException('Subscriber not found');
    }

    return subscriber;
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON) // 8AM EDT
  async sendDailyNewsletter(
    subscribers: Pick<Subscriber, 'email' | 'campus'>[],
  ) {
    let subcribers = subscribers ?? (await this.subscriberService.findAll());

    // Split subscribers by campus
    const subscribersByCampus = {};
    Object.values(EventCampus).forEach((campus) => {
      subscribersByCampus[campus] = [];
    });
    for (const subscriber of subcribers) {
      subscribersByCampus[subscriber.campus].push(subscriber.email);
    }

    // Send daily newsletter for each campus
    const today = new Date().toISOString();
    for (const campus of Object.values(EventCampus)) {
      if (!subscribersByCampus[campus].length) continue;

      const events = await this.eventsSerivce.getFeaturedEvents({
        limit: 5,
        fromDate: today,
        toDate: today,
        campus: EventCampus.Tampa,
      });

      await this.mailService.sendMail({
        to: subscribersByCampus[campus],
        subject: `USF free food events on ${new Date().toLocaleDateString()}`,
        templatePath: path.join(
          process.cwd(),
          'src/mail/templates/daily-newsletter.hbs',
        ),
        context: { events },
      });

      this.logger.log(`Newsletter sent to campus ${campus}`);
    }

    this.logger.log('Daily newsletter sent successfully');
  }
}
