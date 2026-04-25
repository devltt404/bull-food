import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/helper";
import { format } from "date-fns";
import { CalendarIcon, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useEvents } from "./EventsContext";

type QuickDay = "all" | "today" | "tomorrow" | "week";

function getDateButtonLabel(quickDay: QuickDay, dateRange: DateRange | undefined): React.ReactNode {
  if (quickDay !== "all")
    return QUICK_DAYS.find((d) => d.value === quickDay)?.label;
  if (!dateRange?.from)
    return <span className="text-muted-foreground">Pick a date</span>;
  if (!dateRange.to)
    return format(dateRange.from, "LLL dd, y");
  return <>{format(dateRange.from, "LLL dd")} – {format(dateRange.to, "LLL dd, y")}</>;
}

const QUICK_DAYS: { label: string; value: QuickDay }[] = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Week", value: "week" },
];

function getQuickDayDates(day: QuickDay): {
  fromDate?: string;
  toDate?: string;
} {
  if (day === "today") {
    const d = formatDate({ daysOffset: 0 });
    return { fromDate: d, toDate: d };
  }
  if (day === "tomorrow") {
    const d = formatDate({ daysOffset: 1 });
    return { fromDate: d, toDate: d };
  }
  if (day === "week") {
    return { fromDate: formatDate(), toDate: formatDate({ daysOffset: 6 }) };
  }
  return {};
}

export default function EventsFilters() {
  const { setFetchEventsParams } = useEvents();
  const [searchWord, setSearchWord] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [quickDay, setQuickDay] = useState<QuickDay>("all");

  const debouncedSearchWord = useDebouncedValue<string>(searchWord, 300);

  const hasActiveFilters =
    !!debouncedSearchWord || !!dateRange || quickDay !== "all";

  function handleQuickDay(day: QuickDay) {
    setQuickDay(day);
    setDateRange(undefined);
  }

  function handleDateRange(range: DateRange | undefined) {
    setDateRange(range);
    setQuickDay("all");
  }

  function clearAll() {
    setSearchWord("");
    setDateRange(undefined);
    setQuickDay("all");
  }

  useEffect(() => {
    const dateDates =
      quickDay !== "all"
        ? getQuickDayDates(quickDay)
        : {
            fromDate: dateRange?.from
              ? formatDate({ startDate: dateRange.from })
              : undefined,
            toDate: dateRange?.to
              ? formatDate({ startDate: dateRange.to })
              : undefined,
          };

    setFetchEventsParams({
      searchWord: debouncedSearchWord || undefined,
      ...dateDates,
    });
  }, [debouncedSearchWord, dateRange, quickDay, setFetchEventsParams]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search events..."
          className="h-12 bg-muted/50 border-muted pl-10"
        />
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-12 w-full sm:w-[240px] justify-start font-normal bg-muted/50 border-muted",
              (dateRange || quickDay !== "all") && "border-primary text-primary",
            )}
          >
            <CalendarIcon className="mr-2 size-4 shrink-0" />
            {getDateButtonLabel(quickDay, dateRange)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex gap-1.5 border-b p-3">
            {QUICK_DAYS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleQuickDay(opt.value)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-medium transition",
                  quickDay === opt.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Calendar
            className="p-5"
            mode="range"
            selected={dateRange}
            onSelect={handleDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <X className="size-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}
