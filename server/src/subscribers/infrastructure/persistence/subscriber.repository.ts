import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber';
import { FilterSubscriberDto } from 'src/subscribers/dto/query-subscriber';
import { UpdateSubscriberByEmailDto } from 'src/subscribers/dto/update-subscriber';
import { Subscriber } from '../../domain/subscriber.entity';
import { SubscriberMapper } from './subscriber.mapper';
import { SubscriberSchemaClass } from './subscriber.schema';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectModel(SubscriberSchemaClass.name)
    private readonly subscriberModel: Model<SubscriberSchemaClass>,
  ) {}

  async create(data: CreateSubscriberDto): Promise<Subscriber> {
    const persistenceSchema = new this.subscriberModel(data);
    const createdSubscriber = await persistenceSchema.save();
    return SubscriberMapper.toDomain(createdSubscriber);
  }

  async findByEmail(email: Subscriber['email']): Promise<Subscriber | null> {
    const subscriber = await this.subscriberModel.findOne({ email }).lean();
    return subscriber ? SubscriberMapper.toDomain(subscriber) : null;
  }

  async findAll({
    filterOptions = {},
  }: {
    filterOptions?: FilterSubscriberDto;
  }): Promise<Subscriber[]> {
    const subscribers = await this.subscriberModel.find(filterOptions).lean();
    return subscribers.map(SubscriberMapper.toDomain);
  }

  async updateByEmail({
    email,
    payload,
  }: UpdateSubscriberByEmailDto): Promise<Subscriber | null> {
    const updatedSubscriber = await this.subscriberModel
      .findOneAndUpdate(
        {
          email,
        },
        payload,
        { new: true },
      )
      .lean();

    return updatedSubscriber
      ? SubscriberMapper.toDomain(updatedSubscriber)
      : null;
  }
}
