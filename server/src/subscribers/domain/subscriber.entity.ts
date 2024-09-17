export class Subscriber {
  id: string;
  email: string;
  isSubscribed: boolean;
  subscribedAt: Date;
  unSubscribedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
