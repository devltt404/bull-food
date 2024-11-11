import { Injectable, NotFoundException } from '@nestjs/common';
import crypto from 'crypto';
import { CreateSubscriberDto } from './dto/create-subscriber';
import { FilterSubscriberDto } from './dto/query-subscriber';
import { SubscriberRepository } from './repositories/subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  async create(createSubscriberDto: CreateSubscriberDto) {
    const payload = {
      ...createSubscriberDto,
      unsubscribeToken: crypto.randomBytes(16).toString('hex'),
    };

    return this.subscriberRepository.create(payload);
  }

  async findByEmail(email: string) {
    return this.subscriberRepository.findByEmail(email);
  }

  async findAll({ filterOptions }: { filterOptions?: FilterSubscriberDto }) {
    return this.subscriberRepository.findAll({ filterOptions });
  }

  async removeByToken(unsubscribeToken: string) {
    const removedSubscriber =
      await this.subscriberRepository.removeByToken(unsubscribeToken);

    if (!removedSubscriber) {
      throw new NotFoundException('Subscriber not found');
    }

    return removedSubscriber;
  }
}
