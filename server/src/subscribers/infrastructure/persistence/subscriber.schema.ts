import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { EventCampus } from 'src/events/constants/event.constant';
import { SchemaClassHelper } from 'src/utils/schema-class-helper';

export type SubscriberDocument = HydratedDocument<SubscriberSchemaClass>;

@Schema({
  timestamps: true,
  collection: 'subscribers',
})
export class SubscriberSchemaClass extends SchemaClassHelper {
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(EventCampus),
  })
  campus: EventCampus;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isSubscribed: boolean;

  @Prop({
    type: Date,
    default: now,
  })
  subscribedAt: Date;

  @Prop({
    type: Date,
    default: null,
  })
  unSubscribedAt: Date | null;

  @Prop({
    default: now,
  })
  createdAt: Date;

  @Prop({
    default: now,
  })
  updatedAt: Date;
}

export const SubscriberSchema = SchemaFactory.createForClass(
  SubscriberSchemaClass,
);

SubscriberSchema.pre('save', function (next) {
  if (this.isModified('isSubscribed')) {
    if (this.isSubscribed) {
      this.subscribedAt = now();
    } else {
      this.unSubscribedAt = now();
    }
  }
  next();
});
