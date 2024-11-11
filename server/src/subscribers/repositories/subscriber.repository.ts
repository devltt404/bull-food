import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from '../schemas/subscriber.schema';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectModel(Subscriber.name)
    private readonly subscriberModel: Model<Subscriber>,
  ) {}

  async create(
    payload: Omit<Subscriber, '_id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Subscriber> {
    return await this.subscriberModel.create(payload);
  }

  async findByEmail(email: Subscriber['email']): Promise<Subscriber | null> {
    return await this.subscriberModel.findOne({ email }).lean();
  }

  async findAll({
    filterOptions = {},
  }: {
    filterOptions?: Partial<Subscriber>;
  }): Promise<Subscriber[]> {
    return await this.subscriberModel.find(filterOptions).lean();
  }

  async updateById({
    id,
    payload,
  }: {
    id: Subscriber['_id'];
    payload: Partial<Subscriber>;
  }): Promise<Subscriber | null> {
    return await this.subscriberModel
      .findByIdAndUpdate(id, payload, { new: true })
      .lean();
  }

  async updateByEmail({
    email,
    payload,
  }: {
    email: Subscriber['email'];
    payload: Partial<Subscriber>;
  }): Promise<Subscriber | null> {
    return await this.subscriberModel
      .findOneAndUpdate({ email }, payload, { new: true })
      .lean();
  }

  async removeByToken(
    unsubscribeToken: Subscriber['unsubscribeToken'],
  ): Promise<Subscriber | null> {
    return await this.subscriberModel.findOneAndDelete({ unsubscribeToken });
  }
}
