import { useGetEventsQuery } from "@/api/events";
import { Event, EventsFilterOption } from "@/api/events/types";
import { useAppSelector } from "@/app/hooks";
import EmptyEvents from "@/components/events/empty";
import EventsFilter from "@/components/events/filter";
import EventsGroups from "@/components/events/groups";
import EventsGroupsItemSkeleton from "@/components/events/groups/item/skeleton";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { useInfiniteScroll } from "@/hooks/use-inifinite-scroll";
import { getIsoDate } from "@/utils/helper";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

const LIMIT = 40;

const EventsPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const [selectedFilter, setSelectedFilter] = useState<EventsFilterOption>(
    EventsFilterOption.quick,
  );
  const [from, setFrom] = useState<number>(0);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [daysOffset, setdaysOffset] = useState<number | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const debouncedSearchWord = useDebouncedValue<string>(searchWord, 300);

  const isoDateRange = useMemo(() => {
    if (selectedFilter === EventsFilterOption.advanced) {
      return {
        fromDate: dateRange?.from?.toISOString(),
        toDate: dateRange?.to?.toISOString(),
      };
    } else if (
      selectedFilter === EventsFilterOption.quick &&
      daysOffset !== null
    ) {
      const isoDate = getIsoDate(daysOffset);
      return { fromDate: isoDate, toDate: isoDate };
    } else {
      return {};
    }
  }, [selectedFilter, daysOffset, dateRange]);

  const { data, isFetching } = useGetEventsQuery({
    campus,
    range: from,
    searchWord: debouncedSearchWord,
    limit: LIMIT,
    ...isoDateRange,
  });

  // Append new data to the events
  useEffect(() => {
    if (data) {
      setEvents((prev) => (from === 0 ? data : [...(prev || []), ...data]));
    }
  }, [data, from]);

  // Reset the filter when the selected filter is changed
  useEffect(() => {
    setFrom(0);
    if (selectedFilter === EventsFilterOption.quick) {
      setSearchWord("");
      setDateRange(undefined);
    } else {
      setdaysOffset(null);
    }
  }, [selectedFilter, daysOffset, dateRange]);

  useInfiniteScroll(
    () => {
      setFrom((prev) => prev + LIMIT);
    },
    isFetching,
    data?.length !== 0,
    1500,
  );

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="max-w-screen absolute top-0 z-[-2] h-[100vh] w-full bg-[radial-gradient(100%_200%_at_50%_0%,rgba(33,196,93,0.13)_0,rgba(33,196,93,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="container-area">
        <h1 className="gradient-text mb-3 bg-primary-gradient text-4xl font-semibold">
          Food Events
        </h1>

        <EventsFilter
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          dateRange={dateRange}
          daysOffset={daysOffset}
          selectedFilter={selectedFilter}
          setDateRange={setDateRange}
          setdaysOffset={setdaysOffset}
          setSelectedFilter={setSelectedFilter}
        />

        {(isFetching && from === 0) || !events ? (
          <EventsGroupsItemSkeleton />
        ) : events.length > 0 ? (
          <EventsGroups events={events} isFilterChanged={from === 0} />
        ) : (
          <EmptyEvents />
        )}
      </div>
    </motion.div>
  );
};

export default EventsPage;
