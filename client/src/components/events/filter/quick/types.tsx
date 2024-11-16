import React, { FunctionComponent } from "react";

export type QuickEventsFilterComponent = FunctionComponent<{
  daysOffset: number | null;
  setdaysOffset: React.Dispatch<React.SetStateAction<number | null>>;
}>;

export type WordDateLabelComponent = FunctionComponent<{
  word: string;
}>;

export type NumDateLabelComponent = FunctionComponent<{
  date: Date;
}>;
