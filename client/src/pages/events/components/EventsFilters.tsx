import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { addDays, format } from "date-fns";
import { CalendarIcon, Search, X } from "lucide-react";
import React from "react";
import { DateRange } from "react-day-picker";
import { QuickDay, useEvents } from "./EventsContext";

const QUICK_DAYS: { label: string; value: QuickDay }[] = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Next 7 Days", value: "week" },
];

function getDateButtonLabel(quickDay: QuickDay, dateRange: DateRange | undefined): React.ReactNode {
  if (quickDay !== "all")
    return QUICK_DAYS.find((d) => d.value === quickDay)?.label;
  if (!dateRange?.from)
    return <span className="text-muted-foreground">Pick a date</span>;
  if (!dateRange.to)
    return format(dateRange.from, "LLL dd, y");
  return <>{format(dateRange.from, "LLL dd")} – {format(dateRange.to, "LLL dd, y")}</>;
}

export default function EventsFilters() {
  const {
    searchWord,
    setSearchWord,
    dateRange,
    setDateRange,
    quickDay,
    setQuickDay,
    clearFilters,
    hasActiveFilters,
  } = useEvents();

  function handleQuickDay(day: QuickDay) {
    setQuickDay(day);
    if (day === "today") setDateRange({ from: new Date(), to: new Date() });
    else if (day === "tomorrow") { const d = addDays(new Date(), 1); setDateRange({ from: d, to: d }); }
    else if (day === "week") setDateRange({ from: new Date(), to: addDays(new Date(), 6) });
    else setDateRange(undefined);
  }

  function handleDateRange(range: DateRange | undefined) {
    setDateRange(range);
    setQuickDay("all");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search events..."
          className="h-10 bg-muted/50 border-muted pl-10"
        />
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-full sm:w-[240px] justify-start font-normal bg-muted/50 border-muted"
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

      <button
        onClick={clearFilters}
        disabled={!hasActiveFilters}
        className={cn(
          "flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground",
          !hasActiveFilters && "invisible",
        )}
      >
        <X className="size-3.5" />
        Clear
      </button>
    </div>
  );
}
