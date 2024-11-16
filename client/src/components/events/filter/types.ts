import { EventsFilterOption } from "@/api/events/types";
import React, { FunctionComponent } from "react";
import { DateRange } from "react-day-picker";

export type EventsFilterComponent = FunctionComponent<{
  selectedFilter: EventsFilterOption;
  setSelectedFilter: React.Dispatch<React.SetStateAction<EventsFilterOption>>;
  daysOffset: number | null;
  setdaysOffset: React.Dispatch<React.SetStateAction<number | null>>;
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}>;
