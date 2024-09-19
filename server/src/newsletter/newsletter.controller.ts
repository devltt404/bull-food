import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { pickFields } from 'src/utils/pick-fields';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';
import { NewsletterService } from './newsletter.service';

@Controller({
  path: 'newsletter',
  version: '1',
})
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() subscribeNewsletterDto: CreateSubscriberDto) {
    const subscriber = await this.newsletterService.subscribe(
      subscribeNewsletterDto,
    );

    return {
      message: 'Subscribed to newsletter',
      data: {
        subscriber: pickFields(subscriber, ['email']),
      },
    };
  }

  @Post('unsubscribe')
  async unsubscribe(@Body('email') { email }: UnsubscribeNewsletterDto) {
    await this.newsletterService.unsubscribe(email);

    return {
      message: 'Unsubscribed from newsletter',
    };
  }
}
