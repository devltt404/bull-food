import { Event } from "@/api/events/types";
import { EventBadgeType } from "@/constants/event.constant";
import { format, isToday, isTomorrow } from "date-fns";

export function classifyEventBadgeType(going: number) {
  if (going >= 50) {
    return EventBadgeType.hot;
  }
  if (going >= 15) {
    return EventBadgeType.popular;
  }
  return EventBadgeType.none;
}

export function isEventLive(event: Event): boolean {
  const dateStr = event.startDate || event.date;
  if (!dateStr || !event.startTime) return false;

  const parseDateTime = (date: string, time: string) => {
    const match = time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    const d = new Date(date);
    if (!match) return d;
    let h = parseInt(match[1]);
    const m = parseInt(match[2] ?? "0");
    const meridiem = match[3].toUpperCase();
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    d.setHours(h, m, 0, 0);
    return d;
  };

  const now = new Date();
  const start = parseDateTime(dateStr, event.startTime);

  if (event.endTime) {
    const endDateStr = event.endDate || dateStr;
    const end = parseDateTime(endDateStr, event.endTime);
    return now >= start && now <= end;
  }

  // No end time — live if started within the last 3 hours today
  const threeHoursAfterStart = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  return now >= start && now <= threeHoursAfterStart;
}

export function formatRelativeDate(dateStr: string, fallbackFormat = "MMM d"): string {
  const d = new Date(dateStr);
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  return format(d, fallbackFormat);
}

/**
 * Format date to DD MMM YYYY
 */
export function formatDate({
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
