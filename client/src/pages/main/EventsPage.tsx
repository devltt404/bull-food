import { useGetEventsQuery } from "@/api/events.api";
import { useAppSelector } from "@/app/hooks";
import EventsGrid from "@/components/event/EventsGrid";
import FilterAccordion from "@/components/event/filter/FilterAccordion";
import { EventsFilterOption } from "@/types/events.type";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

const EventsPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const [selectedFilter, setSelectedFilter] = useState<EventsFilterOption>(
    EventsFilterOption.quick,
  );
  const [searchWord, setSearchWord] = useState<string>("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState<string>("");
  const [dateOffset, setDateOffset] = useState<number | null>(null);
  const [range, setRange] = useState<number>(0);
  const [advancedDate, setAdvancedDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const isoDateRange = useMemo(() => {
    let from: string | undefined;
    let to: string | undefined;

    if (selectedFilter === EventsFilterOption.quick) {
      const dateObj = new Date();
      if (dateOffset !== null) {
        dateObj.setDate(dateObj.getDate() + dateOffset);
        from = dateObj.toISOString();
        to = dateObj.toISOString();
      }
    } else {
      from = advancedDate?.from?.toISOString();
      to = advancedDate?.to?.toISOString();
    }

    const dateRange: {
      fromDate?: string;
      toDate?: string;
    } = {};
    if (from) dateRange.fromDate = from;
    if (to) dateRange.toDate = to;

    return dateRange;
  }, [selectedFilter, dateOffset, advancedDate]);

  const { data, isFetching } = useGetEventsQuery({
    campus,
    range,
    searchWord: debouncedSearchWord,
    ...isoDateRange,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchWord]);

  return (
    <div>
      <div className="container-area">
        <h1 className="mb-3 text-3xl font-medium">Food Events</h1>

        <FilterAccordion
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          advancedDate={advancedDate}
          dateOffset={dateOffset}
          selectedFilter={selectedFilter}
          setAdvancedDate={setAdvancedDate}
          setDateOffset={setDateOffset}
          setSelectedFilter={setSelectedFilter}
        />

        <EventsGrid isLoading={isFetching} events={data} />
      </div>
    </div>
  );
};

export default EventsPage;
