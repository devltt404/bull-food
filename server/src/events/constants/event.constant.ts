import { CampusId } from 'src/bullsconnect/constants/campus-id.constant';

export enum EventCampus {
  Tampa = 'Tampa',
  StPetersburg = 'St Petersburg',
  SarasotaManatee = 'Sarasota-Manatee',
}

export const EventCampusId: Record<EventCampus, CampusId> = {
  [EventCampus.Tampa]: CampusId.Tampa,
  [EventCampus.StPetersburg]: CampusId.StPetersburg,
  [EventCampus.SarasotaManatee]: CampusId.SarasotaManatee,
};

export enum EventSortBy {
  time = 'time',
  participants = 'participants',
}
