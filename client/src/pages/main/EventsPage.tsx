import { useGetEventsQuery } from "@/api/events.api";
import { useAppSelector } from "@/app/hooks";
import EventsGrid from "@/components/event/EventsGrid";
import FilterAccordion from "@/components/event/filter/FilterAccordion";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Event, EventsFilterOption } from "@/types/event.type";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

const LIMIT = 40;

const EventsPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const [selectedFilter, setSelectedFilter] = useState<EventsFilterOption>(
    EventsFilterOption.quick,
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [dateOffset, setDateOffset] = useState<number | null>(null);
  const [range, setRange] = useState<number>(0);
  const [advancedDate, setAdvancedDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const debouncedSearchWord = useDebouncedValue<string>(searchWord, 300);

  const isoDateRange = useMemo(() => {
    const dateObj = new Date();
    dateObj.setHours(0, 0, 0, 0);

    if (selectedFilter === EventsFilterOption.quick && dateOffset !== null) {
      dateObj.setDate(dateObj.getDate() + dateOffset);
      const dateIso = dateObj.toISOString();
      return { fromDate: dateIso, toDate: dateIso };
    }

    return {
      fromDate: advancedDate?.from?.toISOString(),
      toDate: advancedDate?.to?.toISOString(),
    };
  }, [selectedFilter, dateOffset, advancedDate]);

  const { data, isFetching } = useGetEventsQuery({
    campus,
    range,
    searchWord: debouncedSearchWord,
    limit: LIMIT,
    ...isoDateRange,
  });

  useEffect(() => {
    if (data) {
      setEvents((prev) => (range === 0 ? data : [...prev, ...data]));
    }
  }, [data, range]);

  useEffect(() => {
    setRange(0);
  }, [selectedFilter, dateOffset, advancedDate]);

  useInfiniteScroll(
    () => {
      setRange((prev) => prev + LIMIT);
    },
    isFetching,
    data?.length !== 0,
    1500,
  );

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

        <EventsGrid
          isLoading={isFetching && range === 0}
          events={range === 0 ? data : events}
          isFilterChanged={range === 0}
        />
      </div>
    </div>
  );
};

export default EventsPage;
