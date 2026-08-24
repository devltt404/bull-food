import { useGetEventQuery } from "@/api/events";
import { Event } from "@/api/events/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookText,
  Clock,
  Info,
  MapPin,
  SquareArrowOutUpRight,
  UsersRoundIcon,
  XIcon,
} from "lucide-react";
import { FC, SVGProps } from "react";
import { Link } from "react-router-dom";

interface SectionHeadingProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
}
const SectionHeading = ({ Icon, title }: SectionHeadingProps) => {
  return (
    <div className="mb-4">
      <h3 className="mb-1 font-display text-2xl font-medium">
        <Icon className="mr-2 inline-block h-5 w-5" />
        {title}
      </h3>
      <div className="h-[2px] rounded-xl bg-foreground"></div>
    </div>
  );
};

interface EventDialogProps {
  event: Event;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventDialog = ({ event, show, setShow }: EventDialogProps) => {
  const {
    data: detail,
    isError,
    isLoading,
  } = useGetEventQuery(event.id, {
    skip: !show,
  });

  if (isError) {
    window.open(
      `https://bullsconnect.usf.edu/rsvp_boot?id=${event.id}`,
      "_blank",
    );
    setShow(false);
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="h-[95vh] !max-w-4xl overflow-y-auto border-none p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">{event.title}</DialogTitle>

        <div className="relative">
          <DialogClose asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute top-4 right-4 z-10 size-8"
            >
              <XIcon />
            </Button>
          </DialogClose>

          <div className="aspect-2/1 w-full">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 py-6">
            <h2 className="font-display text-4xl font-bold">{event.title}</h2>

            {event.organizer && (
              <p className="text-md mt-1 text-muted-foreground">
                hosted by
                <span className="font-bold text-foreground">
                  {" "}
                  {event.organizer}
                </span>
              </p>
            )}

            <div className="mt-4 mb-6 flex flex-wrap gap-2">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </>
              ) : (
                detail?.tags.map((tag) => (
                  <Badge
                    className="bg-muted text-sm font-normal text-muted-foreground"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))
              )}
            </div>

            <div className="flex flex-col gap-6">
              <section>
                <SectionHeading title="Info" Icon={Info} />
                {isLoading ? (
                  <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-4 w-2/3 self-center" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-4 w-1/2 self-center" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-4 w-1/4 self-center" />
                  </div>
                ) : (
                  <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <p className="self-center">
                      {detail?.timeInfo1} | {detail?.timeInfo2}
                    </p>

                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="self-center">
                      <p>{detail?.location.name ?? event.location}</p>
                      {detail?.location.address && <p>{detail.location.address}</p>}
                    </div>

                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                      <UsersRoundIcon className="h-5 w-5" />
                    </div>
                    <p className="self-center">
                      <span className="font-medium">
                        {detail?.going ?? event.going}
                      </span>{" "}
                      going
                    </p>
                  </div>
                )}
              </section>

              <section>
                <SectionHeading Icon={BookText} title="Details" />
                {isLoading ? (
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  detail && (
                    <>
                      {detail.details.image && (
                        <img
                          src={detail.details.image}
                          alt={event.title}
                          className="mb-4 w-full"
                        />
                      )}
                      <p>{detail.details.description}</p>
                    </>
                  )
                )}
              </section>

              {detail?.calendarUrl && (
                <div className="mb-2 grid gap-4 md:grid-cols-2">
                  <Button asChild size="lg" variant="default">
                    <Link target="_blank" to={detail.calendarUrl.google}>
                      Add to Google Calendar
                      <SquareArrowOutUpRight className="ml-2 h-4 w-4 stroke-[2.3px]" />
                    </Link>
                  </Button>

                  <Button asChild size="lg" variant="secondary">
                    <Link target="_blank" to={detail.calendarUrl.outlook}>
                      Add to Outlook Calendar
                      <SquareArrowOutUpRight className="ml-2 h-4 w-4 stroke-[2.3px]" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
