import { useGetEventsQuery } from "@/api/events.api";
import { useAppSelector } from "@/app/hooks";
import EventsGrid from "@/components/event/EventsGrid";
import AdvancedFilter from "@/components/event/filter/AdvancedFilter";
import QuickFilter from "@/components/event/filter/QuickFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarSearch, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const EventsPage = () => {
  const { campus } = useAppSelector((state) => state.campus);

  const [range, setRange] = useState<number>(0);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const { data, isFetching } = useGetEventsQuery({
    campus,
    range,
    ...(date?.from && { fromDate: date.from.toISOString() }),
    ...(date?.to && { toDate: date.to.toISOString() }),
  });

  return (
    <div>
      <div className="container-area">
        <h1 className="mb-3 text-3xl font-medium">Food Events</h1>

        <Accordion
          className="mb-8"
          type="single"
          defaultValue="quick"
          collapsible
        >
          <AccordionItem value="quick">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <CalendarSearch className="h-5 w-5" />
                <h2 className="text-lg">Quick Filter</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <QuickFilter />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="advanced">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="text-lg">Advanced Filter</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-1">
                <AdvancedFilter date={date} setDate={setDate} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <EventsGrid isFetching={isFetching} events={data?.data.events} />
      </div>
    </div>
  );
};

export default EventsPage;
