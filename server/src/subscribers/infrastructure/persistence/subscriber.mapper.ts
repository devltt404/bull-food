import { Subscriber } from '../../domain/subscriber.entity';
import { SubscriberSchemaClass } from './subscriber.schema';

export class SubscriberMapper {
  static toDomain(persistenceSchema: SubscriberSchemaClass): Subscriber {
    const domainEntity = new Subscriber();
    domainEntity.id = persistenceSchema._id;
    domainEntity.email = persistenceSchema.email;
    domainEntity.isSubscribed = persistenceSchema.isSubscribed;
    domainEntity.subscribedAt = persistenceSchema.subscribedAt;
    domainEntity.unSubscribedAt = persistenceSchema.unSubscribedAt;
    domainEntity.createdAt = persistenceSchema.createdAt;
    domainEntity.updatedAt = persistenceSchema.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Subscriber): SubscriberSchemaClass {
    const persistenceSchema = new SubscriberSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.email = domainEntity.email;
    persistenceSchema.isSubscribed = domainEntity.isSubscribed;
    persistenceSchema.subscribedAt = domainEntity.subscribedAt;
    persistenceSchema.unSubscribedAt = domainEntity.unSubscribedAt;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    return persistenceSchema;
  }
}
