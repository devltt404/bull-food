import { Search } from "lucide-react";
import React from "react";
import { DateRange } from "react-day-picker";
import { Input } from "../../ui/input";
import { DateRangeFilter } from "./DateRangeFilter";

const AdvancedFilter = ({
  date,
  setDate,
  searchWord,
  setSearchWord,
}: {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="rounded-lg">
      <div className="flex flex-wrap items-stretch gap-x-6 gap-y-4">
        <div className="relative max-w-64">
          <Input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value.trim())}
            placeholder="Search Events"
            className="bg-white pl-12"
          />
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
        </div>

        <DateRangeFilter date={date} setDate={setDate} />
      </div>
    </div>
  );
};

export default AdvancedFilter;
