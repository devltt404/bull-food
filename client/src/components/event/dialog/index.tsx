import { useGetEventQuery } from "@/api/events";
import Overlay from "@/components/event/dialog/overlay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconComponent } from "@/utils/types";
import { motion } from "framer-motion";
import {
  BookText,
  Clock,
  Info,
  MapPin,
  SquareArrowOutUpRight,
  UsersRoundIcon,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { EventDialogComponent } from "./types";

const SectionHeading = ({
  Icon,
  title,
}: {
  Icon: IconComponent;
  title: string;
}) => {
  return (
    <div className="mb-4">
      <h3 className="mb-1 text-2xl font-medium text-green-600">
        <Icon className="mr-2 inline-block h-5 w-5" />
        {title}
      </h3>
      <div className="h-[2px] rounded-xl bg-green-600"></div>
    </div>
  );
};

const EventDialog: EventDialogComponent = ({ id, setShow }) => {
  const { data: event, isLoading } = useGetEventQuery(id);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShow(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".relative")) {
        setShow(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("click", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShow]);

  return (
    <Overlay>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.25 }}
        className="relative min-h-[calc(100vh-4rem)] w-full max-w-4xl overflow-hidden rounded-xl bg-white"
      >
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        {isLoading ? (
          <div className="relative flex h-full w-full items-center justify-center">
            <span className="relative inline-flex h-8 w-8 rounded-full bg-gray-300"></span>
            <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-gray-300 opacity-75"></span>
            <span className="absolute inline-flex h-24 w-24 animate-ping rounded-full bg-gray-300 opacity-75"></span>
          </div>
        ) : (
          event && (
            <div className="relative">
              <div className="aspect-[2/1] w-full">
                <img
                  src={event.image}
                  alt={event?.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-8 py-6">
                <h2 className="text-3xl font-semibold">{event.title}</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  by
                  <span className="font-medium text-secondary">
                    {" "}
                    {event.organizer}
                  </span>
                </p>

                <div className="mb-6 mt-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge
                      className="bg-gray-500 text-sm font-normal text-white hover:bg-gray-600"
                      variant="custom"
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col gap-6">
                  <section>
                    <SectionHeading title="Info" Icon={Info} />
                    <div className="grid grid-cols-[1.8rem_auto] items-center gap-y-3">
                      <Clock className="inline-block h-5 w-5" />
                      <p>
                        {event.timeInfo1} | {event.timeInfo2}
                      </p>

                      <MapPin className="inline-block h-5 w-5" />
                      <div>
                        <p>{event.location.name}</p>
                        <p>{event.location.address}</p>
                      </div>

                      <UsersRoundIcon className="inline-block h-5 w-5" />
                      <p>
                        <span className="font-medium">{event.going}</span> going
                      </p>
                    </div>
                  </section>

                  <section>
                    <SectionHeading Icon={BookText} title="Details" />
                    {event.details.image && (
                      <img
                        src={event.details.image}
                        alt={event.title}
                        className="mb-4 w-full"
                      />
                    )}
                    <p>{event.details.description}</p>
                  </section>

                  {event.calendarUrl && (
                    <div className="mb-2 grid gap-4 md:grid-cols-2">
                      <Button asChild size="lg" variant="default">
                        <Link target="_blank" to={event.calendarUrl.google}>
                          Add to Google Calendar
                          <SquareArrowOutUpRight className="ml-2 h-4 w-4 stroke-[2.3px]" />
                        </Link>
                      </Button>

                      <Button asChild size="lg" variant="secondary">
                        <Link target="_blank" to={event.calendarUrl.outlook}>
                          Add to Outlook Calendar
                          <SquareArrowOutUpRight className="ml-2 h-4 w-4 stroke-[2.3px]" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-4 text-wrap rounded-full border-2 border-black bg-black p-2 text-white transition hover:bg-white hover:text-black"
        >
          <X className="h-6 w-6" />
        </button>
      </motion.div>
    </Overlay>
  );
};

export default EventDialog;
