import { useGetEventsQuery } from "@/api/events";
import { SocialLinks } from "@/config/footer.config";
import { formatDate } from "@/utils/helper";
import { useMemo, useRef } from "react";
import CtaForm from "./components/CtaForm";
import EventsSection from "./components/EventsSection";
import HeroSection from "./components/HeroSection";

const IndexPage = () => {
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const today = useMemo(() => formatDate(), []);
  const endOfWeek = useMemo(() => formatDate({ daysOffset: 6 }), []);

  const { data: todayEvents, isFetching: isTodayFetching } = useGetEventsQuery({
    limit: 10,
    fromDate: today,
    toDate: today,
  });

  const { data: weekEvents, isFetching: isWeekFetching } = useGetEventsQuery({
    limit: 10,
    fromDate: today,
    toDate: endOfWeek,
  });

  return (
    <div style={{ viewTransitionName: "page-content" }} className="relative">
      <HeroSection ctaRef={ctaRef} />
      <div className="flex flex-col gap-16 py-20">
        <div className="animate-fade-up" style={{ animationDelay: "0.55s" }}>
          <EventsSection
            label={{ left: "Happening", highlight: "Today" }}
            isFetching={isTodayFetching}
            events={todayEvents}
          />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <EventsSection
            label={{ left: "Upcoming", highlight: "This Week" }}
            isFetching={isWeekFetching}
            events={weekEvents}
          />
        </div>
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
                <Icon className="size-[26px] text-muted-foreground transition hover:text-green-950" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
