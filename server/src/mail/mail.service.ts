import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import path from 'path';
import { EventSortBy } from 'src/events/enum/event.enum';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly eventsSerivce: EventsService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: this.configService.get('MAIL_SECURE'),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }) {
    const template = await readFile(templatePath, 'utf8');
    const html = Handlebars.compile(template)(context);
    const data = await this.transporter.sendMail({
      ...mailOptions,
      from:
        mailOptions.from ||
        `${this.configService.get('mail.senderName')} <${this.configService.get('mail.senderEmail')}>`,
      html: mailOptions.html || html,
    });
    console.log(data);
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async sendDailyNewsletter() {
    this.logger.log('Sending daily newsletter...');

    const events = await this.eventsSerivce.getEvents({
      limit: 5,
      sortBy: EventSortBy.participants,
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
    });
    try {
      await this.sendMail({
        to: 'phamductri4862@gmail.com',
        subject: `USF free food events on ${new Date().toLocaleDateString()}`,
        templatePath: path.join(
          process.cwd(),
          'src/mail/templates/daily-newsletter.hbs',
        ),
        context: events,
      });

      this.logger.log('Daily newsletter sent successfully');
    } catch (error) {
      this.logger.error('Failed to send daily newsletter', error.stack);
    }
  }
}
