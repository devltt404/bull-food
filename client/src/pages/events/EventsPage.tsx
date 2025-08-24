import EmptyEvents from "@/components/events/EmptyEvents";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import {
  EventsProvider,
  FETCH_EVENTS_LIMIT,
  useEvents,
} from "./components/EventsContext";
import EventsFilters from "./components/EventsFilters";
import EventsGroups from "./components/EventsGroups";
import EventsGroupsSkeleton from "./components/EventsGroups.skeleton";

function EventsPageContent() {
  const {
    events,
    isFetching,
    isError,
    setFetchEventsParams,
    fetchEventsParams: { range },
  } = useEvents();

  const hasEmptyEvents = isError || events.length === 0;

  useInfiniteScroll({
    fetchFn: () => {
      setFetchEventsParams((prev) => ({
        ...prev,
        range: (prev.range || 0) + FETCH_EVENTS_LIMIT,
      }));
    },
    isFetching: isFetching,
    hasMore: !hasEmptyEvents,
    triggerPoint: 1500,
  });

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute top-0 z-[-2] h-screen w-full max-w-screen bg-[radial-gradient(100%_200%_at_50%_0%,rgba(33,196,93,0.13)_0,rgba(33,196,93,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="container py-8">
        <h1 className="gradient-text bg-primary-gradient mb-3 text-4xl font-semibold">
          Food Events
        </h1>

        <div className="mb-8">
          <EventsFilters />
        </div>

        {isFetching && !range ? (
          <EventsGroupsSkeleton />
        ) : hasEmptyEvents ? (
          <EmptyEvents className="mt-20" />
        ) : (
          <EventsGroups events={events} isFilterUpdated={!range} />
        )}
      </div>
    </div>
  );
}

export default function EventsPageV2() {
  return (
    <EventsProvider>
      <EventsPageContent />
    </EventsProvider>
  );
}
