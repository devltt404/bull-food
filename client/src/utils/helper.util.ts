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
