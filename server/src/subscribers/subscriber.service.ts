import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber';
import { UpdateSubscriberByEmailDto } from './dto/update-subscriber';
import { SubscriberRepository } from './infrastructure/persistence/subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  async create(createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberRepository.create(createSubscriberDto);
  }

  async findByEmail(email: string) {
    return this.subscriberRepository.findByEmail(email);
  }

  async findAll() {
    return this.subscriberRepository.findAll();
  }

  async updateByEmail({ email, payload }: UpdateSubscriberByEmailDto) {
    return this.subscriberRepository.updateByEmail({
      email,
      payload,
    });
  }
}
