import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { SubscriberService } from 'src/subscribers/subscriber.service';
import { pickFields } from 'src/utils/pick-fields';

@Injectable()
export class NewsletterService {
  constructor(private readonly subscriberService: SubscriberService) {}

  async subscribe(subscribeNewsletterDto: CreateSubscriberDto) {
    const subscriber = await this.subscriberService.create(
      subscribeNewsletterDto,
    );

    return {
      subscriber: pickFields(subscriber, ['email']),
    };
  }
}
