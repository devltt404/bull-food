import { useGetEventQuery } from "@/api/events.api";
import { IconComponent } from "@/types/icon.type";
import { motion } from "framer-motion";
import { BookText, Clock, Info, MapPin, UsersRoundIcon, X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Badge } from "../ui/badge";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/80">
      <div className="flex justify-center py-8">{children}</div>
    </div>,
    document.body,
  );
};

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

const EventDialog = ({
  id,
  setShow,
}: {
  id: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: event, isLoading } = useGetEventQuery(id);

  useEffect(() => {
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
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShow]);

  return (
    <Overlay>
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.85 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative min-h-[calc(100vh-4rem)] w-full max-w-4xl overflow-hidden rounded-xl bg-background"
      >
        {isLoading ? (
          <div className="h-full animate-pulse bg-gray-300"></div>
        ) : (
          event && (
            <>
              <div className="relative">
                <div className="aspect-[2/1] w-full">
                  <img
                    src={event.image}
                    alt={event?.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="absolute right-4 top-4 rounded-full bg-primary p-2 text-white"
                >
                  <X className="h-6 w-6" />
                </button>
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
                        className="mb-6 w-full"
                      />
                    )}
                    <p>{event.details.description}</p>
                  </section>
                </div>
              </div>
            </>
          )
        )}
      </motion.div>
    </Overlay>
  );
};

export default EventDialog;
