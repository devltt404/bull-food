import { useGetEventsQuery } from "@/api/events.api";
import CtaForm from "@/components/CtaForm";
import EventsCarousel from "@/components/event/EventsCarousel";
import HeroSection from "@/components/HeroSection";
import { EventSortBy } from "@/enums/events.enum";
import { useMemo, useRef } from "react";

const IndexPage = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    return new Date().toISOString();
  }, []);

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  }, []);

  const { data: todayFeaturedData, isLoading: isTodayLoading } =
    useGetEventsQuery({
      limit: 5,
      sortBy: EventSortBy.participants,
      fromDate: today,
      toDate: today,
    });

  const { data: tomorrowFeaturedData, isLoading: isTomorrowLoading } =
    useGetEventsQuery({
      limit: 5,
      sortBy: EventSortBy.participants,
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
      <HeroSection ctaRef={ctaRef} />
      <div className="mb-20 mt-14 flex flex-col gap-14">
        <section className="container">
          <h2 className="mb-8 border-b pb-4 text-3xl font-semibold text-green-950">
            Featured <span className="bg-secondary px-2 text-white">Today</span>
          </h2>
          <EventsCarousel
            isLoading={isTodayLoading}
            events={todayFeaturedEvents}
          />
        </section>

        <section className="container">
          <h2 className="mb-8 border-b pb-4 text-3xl font-semibold text-green-950">
            Featured{" "}
            <span className="bg-secondary px-2 text-white">Tomorrow</span>
          </h2>
          <EventsCarousel
            isLoading={isTomorrowLoading}
            events={tomorrowFeaturedEvents}
          />
        </section>
      </div>

      <CtaForm ctaRef={ctaRef} />
    </div>
  );
};

export default IndexPage;
