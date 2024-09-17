import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import path from 'path';
import { EventCampus } from 'src/events/constants/event.constant';
import { EventsService } from 'src/events/events.service';
import { MailService } from 'src/mail/mail.service';
import { Subscriber } from 'src/subscribers/domain/subscriber.entity';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { SubscriberService } from 'src/subscribers/subscriber.service';
import { pickFields } from 'src/utils/pick-fields';
import { SendDailyNewsletterDto } from './dto/send-daily-newsletter.dto';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly eventsSerivce: EventsService,
    private readonly mailService: MailService,
  ) {}

  async subscribe(subscribeNewsletterDto: CreateSubscriberDto) {
    let subscriber: Subscriber;

    try {
      subscriber = await this.subscriberService.create(subscribeNewsletterDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Subscriber already exists');
      }
    }

    await this.sendDailyNewsletter({
      subscribers: [subscriber],
    });
    return {
      subscriber: pickFields(subscriber, ['email', 'campus']),
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async sendDailyNewsletter({ subscribers }: SendDailyNewsletterDto) {
    this.logger.log('Sending daily newsletter...');

    let subcribers = subscribers || (await this.subscriberService.findAll());

    // Split subscribers by campus
    const subscribersByCampus = {};
    Object.values(EventCampus).forEach((campus) => {
      subscribersByCampus[campus] = [];
    });
    for (const subscriber of subcribers) {
      subscribersByCampus[subscriber.campus].push(subscriber.email);
    }

    try {
      // Send daily newsletter for each campus
      Object.values(EventCampus).forEach(async (campus) => {
        const events = await this.eventsSerivce.getFeaturedEvents({
          limit: 5,
          fromDate: new Date().toISOString(),
          toDate: new Date().toISOString(),
          campus: EventCampus.Tampa,
        });
        await this.mailService.sendMail({
          to: subscribersByCampus[campus],
          subject: `USF free food events on ${new Date().toLocaleDateString()}`,
          templatePath: path.join(
            process.cwd(),
            'src/mail/templates/daily-newsletter.hbs',
          ),
          context: events,
        });
      });

      this.logger.log('Daily newsletter sent successfully');
    } catch (error) {
      this.logger.error('Failed to send daily newsletter', error.stack);
    }
  }
}
