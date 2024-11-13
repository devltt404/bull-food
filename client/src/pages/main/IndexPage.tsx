import { useGetEventsQuery, useGetFeaturedEventsQuery } from "@/api/events.api";
import { useAppSelector } from "@/app/hooks";
import CtaForm from "@/components/cta/CtaForm";
import EventsSection from "@/components/event/EventsSection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/layout/Footer";
import { EventsSectionProps } from "@/types/event.type";
import { getIsoDate } from "@/utils/helper.util";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

const IndexPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const ctaRef = useRef<HTMLDivElement>(null);

  // Memoize dates
  const today = useMemo(() => getIsoDate(), []);
  const tomorrow = useMemo(() => getIsoDate(1), []);

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

  const { data: upcomingEvents, isFetching: isUpcomingFetching } =
    useGetEventsQuery({
      limit: 10,
      campus,
    });

  const eventSections: EventsSectionProps[] = useMemo(
    () => [
      {
        label: { highlight: "Upcoming", right: "Events" },
        isFetching: isUpcomingFetching,
        events: upcomingEvents,
      },
      {
        label: { left: "Featured", highlight: "Today" },
        isFetching: isTodayFetching,
        events: todayFeaturedEvents,
      },
      {
        label: { left: "Featured", highlight: "Tomorrow" },
        isFetching: isTomorrowFetching,
        events: tomorrowFeaturedEvents,
      },
    ],
    [upcomingEvents, todayFeaturedEvents, tomorrowFeaturedEvents],
  );

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Background */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/50 opacity-50 blur-[80px]"></div>
      </div>

      <HeroSection ctaRef={ctaRef} />
      <div className="flex flex-col gap-16 py-20">
        {eventSections.map((section, index) => (
          <EventsSection key={index} {...section} />
        ))}
      </div>

      <CtaForm ctaRef={ctaRef} />

      <Footer />
    </motion.div>
  );
};

export default IndexPage;
