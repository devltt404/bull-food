import { EventsFilterOption } from "@/api/events/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarSearch, SlidersHorizontal } from "lucide-react";
import AdvancedEventsFilter from "./advanced";
import QuickEventsFilter from "./quick";
import { EventsFilterComponent } from "./types";

const EventsFilter: EventsFilterComponent = ({
  selectedFilter,
  setSelectedFilter,
  daysOffset,
  setDaysOffset,
  dateRange,
  setDateRange,
  searchWord,
  setSearchWord,
}) => {
  return (
    <Accordion
      className="mb-8"
      type="single"
      value={selectedFilter}
      onValueChange={(val: EventsFilterOption) => setSelectedFilter(val)}
      collapsible
    >
      <AccordionItem value={EventsFilterOption.quick}>
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <CalendarSearch className="h-5 w-5" />
            <h2 className="text-lg">Quick Filter</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <QuickEventsFilter
            daysOffset={daysOffset}
            setDaysOffset={setDaysOffset}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value={EventsFilterOption.advanced}>
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            <h2 className="text-lg">Advanced Filter</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-1 pt-1">
          <AdvancedEventsFilter
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            date={dateRange}
            setDate={setDateRange}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EventsFilter;
