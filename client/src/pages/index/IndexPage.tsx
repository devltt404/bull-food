import { useGetEventsQuery, useGetFeaturedEventsQuery } from "@/api/events";
import { useAppSelector } from "@/app/hooks";
import { SocialLinks } from "@/config/footer.config";
import { formatDate } from "@/utils/helper";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import CtaForm from "./components/CtaForm";
import EventsSection, { EventsSectionProps } from "./components/EventsSection";
import HeroSection from "./components/HeroSection";

const IndexPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const ctaRef = useRef<HTMLDivElement>(null);

  // Memoize dates
  const today = useMemo(() => formatDate(), []);
  const tomorrow = useMemo(
    () =>
      formatDate({
        daysOffset: 1,
      }),
    [],
  );

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
    [
      upcomingEvents,
      todayFeaturedEvents,
      tomorrowFeaturedEvents,
      isTodayFetching,
      isTomorrowFetching,
      isUpcomingFetching,
    ],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="relative"
    >
      {/* Background */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute top-0 right-0 bottom-auto left-auto h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/50 opacity-50 blur-[80px]" />
      </div>
      <HeroSection ctaRef={ctaRef} />
      <div className="flex flex-col gap-16 py-20">
        {eventSections.map((section, index) => (
          <div
            key={index}
            className="animate-fade-up"
            style={{
              animationDelay: `${0.55 + index * 0.1}s`,
            }}
          >
            <EventsSection {...section} />
          </div>
        ))}
      </div>
      <CtaForm ref={ctaRef} />
      <footer className="relative bg-lime-50 py-2.5">
        <div className="container flex items-center justify-between">
          <p className="font-medium text-green-900">
            &copy; Made by <span className="font-semibold">Tri Pham</span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {SocialLinks.map(({ icon: Icon, link, label }, idx) => (
              <a key={idx} href={link} target="_blank" rel="noreferrer">
                <Icon className="h-[26px] w-[26px] text-muted-foreground transition hover:text-green-950" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default IndexPage;
