import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import { SendMailData } from './interfaces/send-mail.interface';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
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

  async sendMail({ templatePath, context, ...mailOptions }: SendMailData) {
    const template = await readFile(templatePath, 'utf8');
    const html = Handlebars.compile(template)(context);
    const data = await this.transporter.sendMail({
      ...mailOptions,
      from:
        mailOptions.from ||
        `${this.configService.get('mail.senderName')} <${this.configService.get('mail.senderEmail')}>`,
      html: mailOptions.html || html,
    });
    return data;
  }
}
