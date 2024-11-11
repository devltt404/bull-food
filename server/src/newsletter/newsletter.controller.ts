import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { pickFields } from 'src/utils/pick-fields';
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

    return pickFields(subscriber, ['email', 'campus']);
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() { token }: { token: string }) {
    const subscriber = await this.newsletterService.unsubscribe(token);
    return pickFields(subscriber, ['email', 'campus']);
  }
}
