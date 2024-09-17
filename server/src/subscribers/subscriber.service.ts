import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber';
import { SubscriberRepository } from './infrastructure/persistence/subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  async create(createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberRepository.create(createSubscriberDto);
  }

  async findAll() {
    return this.subscriberRepository.findAll();
  }
}
