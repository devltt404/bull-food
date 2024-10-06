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
      const today = new Date().toISOString();
      this.sendNewsLetter({
        subscribers: [subscriber.email],
        campus: subscriber.campus,
        fromDate: today,
        toDate: today,
      });

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

  /**
   * Send newsletter of featured events to subscribers at specified campus in the given date range.
   */
  private async sendNewsLetter({
    subscribers,
    campus,
    fromDate,
    toDate,
  }: {
    subscribers: Subscriber['email'][];
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
    this.logger.log(
      `📧 Sending newsletter to subscribers at ${campus}: ${subscribers.join(', ')}`,
    );

    try {
      await this.mailService.sendMail({
        to: subscribers,
        subject: `USF free food events on ${new Date().toLocaleDateString()}`,
        templatePath: path.join(
          process.cwd(),
          'src/mail/templates/daily-newsletter.hbs',
        ),
        context: { events },
      });

      this.logger.log(
        `📧 Newsletter sent to ${subscribers.length} subscribers at ${campus}`,
      );
    } catch (error) {
      this.logger.error(
        `❌ Failed to send newsletter to ${subscribers.length} subscribers at ${campus}`,
      );
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

    const subcribers = await this.subscriberService.findAll({
      filterOptions: { isSubscribed: true },
    });

    // Split subscribers by campus
    const subscribersByCampus = {};
    Object.values(EventCampus).forEach((campus) => {
      subscribersByCampus[campus] = [];
    });
    for (const subscriber of subcribers) {
      subscribersByCampus[subscriber.campus].push(subscriber.email);
    }

    const today = new Date().toISOString();

    // Send daily newsletter for each campus
    for (const campus of Object.values(EventCampus)) {
      await this.sendNewsLetter({
        subscribers: subscribersByCampus[campus],
        campus,
        fromDate: today,
        toDate: today,
      });
    }

    this.logger.log('📥 Daily newsletter sent successfully');
  }
}
