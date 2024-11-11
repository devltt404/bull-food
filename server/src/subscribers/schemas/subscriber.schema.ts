import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventCampus } from 'src/events/constants/event.constant';
import { SchemaClassHelper } from 'src/utils/schema-class-helper';

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({
  timestamps: true,
  collection: 'subscribers',
})
export class Subscriber extends SchemaClassHelper {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    enum: Object.values(EventCampus),
  })
  campus: EventCampus;

  @Prop({
    unique: true,
  })
  unsubscribeToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
