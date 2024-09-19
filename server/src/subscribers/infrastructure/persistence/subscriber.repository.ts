import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from '../../domain/subscriber.entity';
import { SubscriberMapper } from './subscriber.mapper';
import { SubscriberSchemaClass } from './subscriber.schema';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectModel(SubscriberSchemaClass.name)
    private readonly subscriberModel: Model<SubscriberSchemaClass>,
  ) {}

  async create(
    data: Pick<Subscriber, 'email' | 'campus'>,
  ): Promise<Subscriber> {
    const persistenceSchema = new this.subscriberModel(data);
    const createdSubscriber = await persistenceSchema.save();
    return SubscriberMapper.toDomain(createdSubscriber);
  }

  async findAll(): Promise<Subscriber[]> {
    const subscribers = await this.subscriberModel.find().lean();
    return subscribers.map(SubscriberMapper.toDomain);
  }

  async updateByEmail({
    email,
    payload,
  }: {
    email: string;
    payload: Partial<Subscriber>;
  }): Promise<Subscriber | null> {
    const clonePayload = { ...payload };
    delete clonePayload.id;

    const updatedSubscriber = await this.subscriberModel
      .findOneAndUpdate(
        {
          email,
        },
        clonePayload,
        { new: true },
      )
      .lean();

    return updatedSubscriber
      ? SubscriberMapper.toDomain(updatedSubscriber)
      : null;
  }
}
