import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EventsService } from 'src/events/events.service';
export declare class MailService {
    private readonly configService;
    private readonly eventsSerivce;
    private readonly transporter;
    private readonly logger;
    constructor(configService: ConfigService, eventsSerivce: EventsService);
    sendMail({ templatePath, context, ...mailOptions }: nodemailer.SendMailOptions & {
        templatePath: string;
        context: Record<string, unknown>;
    }): Promise<void>;
    sendDailyNewsletter(): Promise<void>;
}
