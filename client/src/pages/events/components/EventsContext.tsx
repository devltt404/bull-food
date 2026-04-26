import { useGetEventsQuery } from "@/api/events";
import {
  GetEventsParams as BaseGetEventsParams,
  Event,
} from "@/api/events/types";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { formatDate } from "@/utils/helper";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

export const FETCH_EVENTS_LIMIT = 40;
export type QuickDay = "all" | "today" | "tomorrow" | "week";

type GetEventsParams = Omit<BaseGetEventsParams, "limit">;

function getQuickDayDates(day: QuickDay): { fromDate?: string; toDate?: string } {
  if (day === "today") {
    const d = formatDate({ daysOffset: 0 });
    return { fromDate: d, toDate: d };
  }
  if (day === "tomorrow") {
    const d = formatDate({ daysOffset: 1 });
    return { fromDate: d, toDate: d };
  }
  if (day === "week") {
    return { fromDate: formatDate(), toDate: formatDate({ daysOffset: 6 }) };
  }
  return {};
}

interface EventsContextType {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  quickDay: QuickDay;
  setQuickDay: Dispatch<SetStateAction<QuickDay>>;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  fetchEventsParams: GetEventsParams;
  setFetchEventsParams: Dispatch<SetStateAction<GetEventsParams>>;
  events: Event[];
  isFetching: boolean;
  isError: boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: PropsWithChildren) => {
  const [searchWord, setSearchWord] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [quickDay, setQuickDay] = useState<QuickDay>("all");
  const [fetchEventsParams, setFetchEventsParams] = useState<GetEventsParams>({});

  const debouncedSearchWord = useDebouncedValue<string>(searchWord, 300);

  const hasActiveFilters = !!debouncedSearchWord || !!dateRange || quickDay !== "all";

  function clearFilters() {
    setSearchWord("");
    setDateRange(undefined);
    setQuickDay("all");
  }

  useEffect(() => {
    const dateDates =
      quickDay !== "all"
        ? getQuickDayDates(quickDay)
        : {
            fromDate: dateRange?.from
              ? formatDate({ startDate: dateRange.from })
              : undefined,
            toDate: dateRange?.to
              ? formatDate({ startDate: dateRange.to })
              : undefined,
          };

    setFetchEventsParams({
      searchWord: debouncedSearchWord || undefined,
      ...dateDates,
    });
  }, [debouncedSearchWord, dateRange, quickDay]);

  const { data, isFetching, isError } = useGetEventsQuery({
    ...fetchEventsParams,
    limit: FETCH_EVENTS_LIMIT,
  });

  return (
    <EventsContext.Provider
      value={{
        searchWord,
        setSearchWord,
        dateRange,
        setDateRange,
        quickDay,
        setQuickDay,
        clearFilters,
        hasActiveFilters,
        fetchEventsParams,
        setFetchEventsParams,
        events: data || [],
        isFetching,
        isError,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
