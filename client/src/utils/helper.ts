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

export function getDDMMMYYYYDate({
  daysOffset,
  startDate,
}: {
  daysOffset?: number;
  startDate?: Date;
} = {}): string {
  const dateObj = startDate ? new Date(startDate) : new Date();
  if (daysOffset) {
    dateObj.setDate(dateObj.getDate() + daysOffset);
  }
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
}
