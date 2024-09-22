import { useGetFeaturedEventsQuery } from "@/api/events.api";
import { useAppSelector } from "@/app/hooks";
import CtaForm from "@/components/CtaForm";
import EventsCarousel from "@/components/event/EventsCarousel";
import HeroSection from "@/components/HeroSection";
import { useMemo, useRef } from "react";

const IndexPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const ctaRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    return new Date().toISOString();
  }, []);

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  }, []);

  const { data: todayFeaturedEvents, isFetching: isTodayFetching } =
    useGetFeaturedEventsQuery({
      limit: 10,
      campus,
      fromDate: today,
      toDate: today,
    });

  const { data: tomorrowFeaturedEvents, isFetching: isTomorrowFetching } =
    useGetFeaturedEventsQuery({
      limit: 10,
      campus,
      fromDate: tomorrow,
      toDate: tomorrow,
    });

  return (
    <div>
      <HeroSection ctaRef={ctaRef} />
      <div className="flex flex-col gap-14 py-20">
        <section className="container">
          <h2 className="mb-8 border-b pb-4 text-3xl font-semibold text-green-950">
            Featured <span className="bg-secondary px-2 text-white">Today</span>
          </h2>
          <EventsCarousel
            isFetching={isTodayFetching}
            events={todayFeaturedEvents}
          />
        </section>

        <section className="container">
          <h2 className="mb-8 border-b pb-4 text-3xl font-semibold text-green-950">
            Featured{" "}
            <span className="bg-secondary px-2 text-white">Tomorrow</span>
          </h2>
          <EventsCarousel
            isFetching={isTomorrowFetching}
            events={tomorrowFeaturedEvents}
          />
        </section>
      </div>

      <CtaForm ctaRef={ctaRef} />
    </div>
  );
};

export default IndexPage;
