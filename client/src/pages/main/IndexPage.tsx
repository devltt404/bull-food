import { useGetEventsQuery, useGetFeaturedEventsQuery } from "@/api/events.api";
import { useAppSelector } from "@/app/hooks";
import CtaForm from "@/components/CtaForm";
import EventsSection from "@/components/event/EventsSection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/layout/Footer";
import { EventsSectionProps } from "@/types/event.type";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

const IndexPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const ctaRef = useRef<HTMLDivElement>(null);

  // Memoize dates
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

  const { data: upcomingEvents, isFetching: isUpcomingFetching } =
    useGetEventsQuery({
      limit: 10,
      campus,
    });

  const eventSections: EventsSectionProps[] = [
    {
      label: {
        highlight: "Upcoming",
        right: "Events",
      },
      isFetching: isUpcomingFetching,
      events: upcomingEvents,
    },
    {
      label: {
        left: "Featured",
        highlight: "Today",
      },
      isFetching: isTodayFetching,
      events: todayFeaturedEvents,
    },
    {
      label: {
        left: "Featured",
        highlight: "Tomorrow",
      },
      isFetching: isTomorrowFetching,
      events: tomorrowFeaturedEvents,
    },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
    >
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
