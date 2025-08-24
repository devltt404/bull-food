import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { formatDate } from "@/utils/helper";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useEvents } from "./EventsContext";

export default function EventsAdvancedFilter() {
  const [searchWord, setSearchWord] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();
  const { setFetchEventsParams } = useEvents();

  const debouncedSearchWord = useDebouncedValue<string>(searchWord, 300);

  useEffect(() => {
    const { from, to } = dateRange || {};
    setFetchEventsParams({
      searchWord: debouncedSearchWord || undefined,
      fromDate: from ? formatDate({ startDate: from }) : undefined,
      toDate: to ? formatDate({ startDate: to }) : undefined,
    });
  }, [debouncedSearchWord, dateRange, setFetchEventsParams]);

  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-x-6 gap-y-4">
        <div className="relative max-w-64">
          <Input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Search Events"
            className="bg-background pl-10"
          />
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        </div>

        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-full w-[280px] justify-start font-normal"
              >
                <CalendarIcon className="mr-2" />
                {dateRange ? (
                  <>
                    {format(dateRange.from!, "LLL dd, y")} -{" "}
                    {format(dateRange.to!, "LLL dd, y")}
                  </>
                ) : (
                  <span className="text-muted-foreground">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                className="p-5"
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
