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

  const isInitialLoad = !range;
  const hasNoEvents = events.length === 0;

  useInfiniteScroll({
    fetchFn: () => {
      setFetchEventsParams((prev) => ({
        ...prev,
        range: (prev.range || 0) + FETCH_EVENTS_LIMIT,
      }));
    },
    isFetching: isFetching,
    // Stop fetching once the last page returned nothing
    hasMore: !isError && !hasNoEvents,
    triggerPoint: 1500,
  });

  return (
    <div style={{ viewTransitionName: "page-content" }} className="flex flex-col pb-16">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b pb-4 pt-6 shadow-sm">
        <div className="container px-4 md:px-6">
          <EventsFilters />
        </div>
      </div>

      <div className="container px-4 md:px-6 pt-8 space-y-12">
        {isFetching && isInitialLoad ? (
          <EventsGroupsSkeleton />
        ) : isInitialLoad && hasNoEvents && !isFetching ? (
          <EmptyEvents className="mt-20" />
        ) : (
          <EventsGroups events={events} isFilterUpdated={isInitialLoad} />
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <EventsProvider>
      <EventsPageContent />
    </EventsProvider>
  );
}
