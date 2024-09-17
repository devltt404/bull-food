import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { NewsletterService } from './newsletter.service';

@Controller({
  path: 'newsletter',
  version: '1',
})
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() subscribeNewsletterDto: CreateSubscriberDto) {
    return {
      message: 'Subscribed to newsletter',
      data: await this.newsletterService.subscribe(subscribeNewsletterDto),
    };
  }
}
