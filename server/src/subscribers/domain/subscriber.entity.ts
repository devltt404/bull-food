import { EventCampus } from 'src/events/constants/event.constant';

export class Subscriber {
  id: string;
  campus: EventCampus;
  email: string;
  isSubscribed: boolean;
  subscribedAt: Date;
  unSubscribedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
