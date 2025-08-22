import React, { FunctionComponent } from "react";
import { DateRange } from "react-day-picker";

export type DateRangeFilterComponent = FunctionComponent<{
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  className?: string;
}>;
