import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EventsFilterOption } from "@/types/event.type";
import { CalendarSearch, SlidersHorizontal } from "lucide-react";
import React from "react";
import { DateRange } from "react-day-picker";
import AdvancedFilter from "./AdvancedFilter";
import QuickFilter from "./QuickFilter";

interface FilterAccordionProps {
  selectedFilter: EventsFilterOption;
  setSelectedFilter: React.Dispatch<React.SetStateAction<EventsFilterOption>>;
  dateOffset: number | null;
  setDateOffset: React.Dispatch<React.SetStateAction<number | null>>;
  advancedDate: DateRange | undefined;
  setAdvancedDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const FilterAccordion = ({
  selectedFilter,
  setSelectedFilter,
  dateOffset,
  setDateOffset,
  advancedDate,
  setAdvancedDate,
  searchWord,
  setSearchWord,
}: FilterAccordionProps) => {
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
          <QuickFilter dateOffset={dateOffset} setDateOffset={setDateOffset} />
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
          <AdvancedFilter
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            date={advancedDate}
            setDate={setAdvancedDate}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordion;
