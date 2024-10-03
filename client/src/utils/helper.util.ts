import { EventBadgeType } from "@/constants/event.constant";

export function classifyEventBadgeType(going: number) {
  if (going >= 50) {
    return EventBadgeType.hot;
  }
  if (going >= 15) {
    return EventBadgeType.popular;
  }
  return EventBadgeType.none;
}

export function getIsoDate(daysOffset?: number) {
  const dateObj = new Date();
  if (daysOffset) {
    dateObj.setDate(dateObj.getDate() + daysOffset);
  }
  // Reset time to 00:00:00 for consistency
  dateObj.setHours(0, 0, 0, 0);

  return dateObj.toISOString();
}
