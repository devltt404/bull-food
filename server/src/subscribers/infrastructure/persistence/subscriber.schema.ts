import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { SchemaClassHelper } from 'src/utils/schema-class-helper';

export type SubscriberDocument = HydratedDocument<SubscriberSchemaClass>;

@Schema({
  timestamps: true,
})
export class SubscriberSchemaClass extends SchemaClassHelper {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

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
