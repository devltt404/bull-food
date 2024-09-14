import { useGetEventsQuery } from "@/api/events.api";
import EventsCarousel from "@/components/event/EventsCarousel";
import { Button } from "@/components/ui/button";
import { EventsSortBy } from "@/enums/events.enum";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";

const IndexPage = () => {
  const today = useMemo(() => {
    return new Date().toISOString();
  }, []);

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  }, []);

  const { data: todayFeaturedData } = useGetEventsQuery({
    limit: 5,
    sortBy: EventsSortBy.participants,
    fromDate: today,
    toDate: today,
  });

  const { data: tomorrowFeaturedData } = useGetEventsQuery({
    limit: 5,
    sortBy: EventsSortBy.participants,
    fromDate: tomorrow,
    toDate: tomorrow,
  });

  const todayFeaturedEvents = useMemo(() => {
    return todayFeaturedData?.data.events;
  }, [todayFeaturedData]);

  const tomorrowFeaturedEvents = useMemo(() => {
    return tomorrowFeaturedData?.data.events;
  }, [tomorrowFeaturedData]);

  return (
    <div>
      <div className="my-16 flex h-[20rem] items-center">
        <div className="container mx-auto max-w-2xl">
          <h1 className="mb-8 text-center text-6xl font-semibold leading-tight">
            Hungry on Campus?
          </h1>
          <p className="mb-8 text-center text-xl text-muted-foreground">
            BullFood helps you find free food events near you!
          </p>
          <div className="text-center">
            <Button variant="secondary" className="px-8 py-6 text-lg">
              Discover Now
              <ChevronRight strokeWidth={2} size={24} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        {todayFeaturedEvents && todayFeaturedEvents.length > 0 && (
          <div className="container">
            <h2 className="mb-6 text-3xl font-medium">Featured Today</h2>
            <EventsCarousel events={todayFeaturedEvents} />
          </div>
        )}

        {tomorrowFeaturedEvents && (
          <div className="container">
            <h2 className="mb-6 text-3xl font-medium">Featured Tomorrow</h2>
            <EventsCarousel events={tomorrowFeaturedEvents} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
