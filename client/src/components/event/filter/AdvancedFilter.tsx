import { Search } from "lucide-react";
import React from "react";
import { DateRange } from "react-day-picker";
import { Input } from "../../ui/input";
import { DateRangeFilter } from "./DateRangeFilter";

const AdvancedFilter = ({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) => {
  return (
    <div className="rounded-lg">
      <div className="flex items-stretch gap-6">
        <div className="relative max-w-64">
          <Input placeholder="Search Events" className="bg-white pl-12" />
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
        </div>

        <DateRangeFilter date={date} setDate={setDate} />
      </div>
    </div>
  );
};

export default AdvancedFilter;
