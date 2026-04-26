import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { UtensilsCrossed } from "lucide-react";

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
    hasMore: !isError && !hasNoEvents,
    triggerPoint: 1500,
  });

  return (
    <div className="animate-page-in flex flex-col pb-16">
      <div className="sticky top-[66px] z-40 border-b bg-background pt-6 pb-4 shadow-sm">
        <div className="container px-4 md:px-6">
          <EventsFilters />
        </div>
      </div>

      <div className="container space-y-12 px-4 pt-8 md:px-6">
        {isFetching && isInitialLoad ? (
          <EventsGroupsSkeleton />
        ) : isInitialLoad && hasNoEvents && !isFetching ? (
          <div className="mx-auto flex max-w-md flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold">
              No events found
            </h2>
            <p className="text-muted-foreground">
              We couldn't find any food events matching your search criteria.
              Try adjusting your filters.
            </p>
          </div>
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
