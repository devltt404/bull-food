import { useGetEventsQuery } from "@/api/events.api";
import EventsCarousel from "@/components/event/EventsCarousel";
import HeroSection from "@/components/HeroSection";
import { EventsSortBy } from "@/enums/events.enum";
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
      <HeroSection />

      <div>
        {todayFeaturedEvents && todayFeaturedEvents.length > 0 && (
          <div className="container">
            <h2 className="mb-6 text-3xl font-semibold">Featured Today</h2>
            <EventsCarousel events={todayFeaturedEvents} />
          </div>
        )}

        {tomorrowFeaturedEvents && (
          <div className="container">
            <h2 className="mb-6 text-3xl font-semibold">Featured Tomorrow</h2>
            <EventsCarousel events={tomorrowFeaturedEvents} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
