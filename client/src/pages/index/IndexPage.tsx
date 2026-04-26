import { useGetEventsQuery } from "@/api/events";
import { SocialLinks } from "@/config/footer.config";
import { createFadeStagger } from "@/utils/animation";
import { formatDate } from "@/utils/helper";
import { Utensils } from "lucide-react";
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
    limit: 8,
    fromDate: today,
    toDate: endOfWeek,
  });

  return (
    <div className="animate-page-in relative">
      <HeroSection ctaRef={ctaRef} />
      {(() => {
        const sectionDelay = createFadeStagger(0.55);
        return (
          <div className="flex flex-col gap-16 py-20">
            <div className="animate-fade-up" {...sectionDelay()}>
              <EventsSection
                label="Happening Today"
                isFetching={isTodayFetching}
                events={todayEvents}
                emptyContent={
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-12 text-center">
                    <Utensils className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <h3 className="text-xl font-bold">Quiet day on campus</h3>
                    <p className="mt-2 max-w-md text-muted-foreground">
                      No events found for today. Check out what's coming up
                      later this week!
                    </p>
                  </div>
                }
              />
            </div>
            <div className="animate-fade-up" {...sectionDelay()}>
              <EventsSection
                label="Upcoming Events"
                isFetching={isWeekFetching}
                events={weekEvents}
              />
            </div>
          </div>
        );
      })()}
      <CtaForm ref={ctaRef} />
      <footer className="relative bg-muted/40 py-2.5">
        <div className="container flex items-center justify-between">
          <p className="font-medium text-muted-foreground">
            &copy; Made by{" "}
            <span className="font-semibold text-foreground">Tri Pham</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {SocialLinks.map(({ icon: Icon, link, label }, idx) => (
              <a key={idx} href={link} target="_blank" rel="noreferrer">
                <Icon className="size-[26px] text-muted-foreground transition hover:text-foreground" />
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
