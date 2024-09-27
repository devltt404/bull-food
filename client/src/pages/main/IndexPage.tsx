import { useGetFeaturedEventsQuery } from "@/api/events.api";
import { useAppSelector } from "@/app/hooks";
import Logo from "@/assets/logo.png";
import CtaForm from "@/components/CtaForm";
import EventsSection from "@/components/event/EventsSection";
import HeroSection from "@/components/HeroSection";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
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
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
    >
      <HeroSection ctaRef={ctaRef} />
      <div className="flex flex-col gap-14 py-20">
        <EventsSection
          day="Today"
          isFetching={isTodayFetching}
          events={todayFeaturedEvents}
        />
        <EventsSection
          day="Tomorrow"
          isFetching={isTomorrowFetching}
          events={tomorrowFeaturedEvents}
        />
      </div>

      <CtaForm ctaRef={ctaRef} />
      <footer className="relative flex items-center justify-between gap-4 bg-lime-50 px-8 py-3">
        <img src={Logo} className="w-10" />

        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-green-900">
          &copy; Made by <span className="font-medium">Tri Pham</span>
        </p>

        <div className="flex items-center gap-4">
          <GitHubLogoIcon className="h-7 w-7" />
          <LinkedInLogoIcon className="h-7 w-7" />
          <Mail className="h-7 w-7" />
        </div>
      </footer>
    </motion.div>
  );
};

export default IndexPage;
