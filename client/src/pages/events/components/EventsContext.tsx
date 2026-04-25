import { useGetEventsQuery } from "@/api/events";
import {
  GetEventsParams as BaseGetEventsParams,
  Event,
} from "@/api/events/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const FETCH_EVENTS_LIMIT = 40;

// "limit" will always be included in the query
type GetEventsParams = Omit<BaseGetEventsParams, "limit">;

interface EventsContextType {
  fetchEventsParams: GetEventsParams;
  setFetchEventsParams: Dispatch<SetStateAction<GetEventsParams>>;
  events: Event[];
  isFetching: boolean;
  isError: boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: PropsWithChildren) => {
  const [fetchEventsParams, setFetchEventsParams] = useState<GetEventsParams>(
    {},
  );

  const { data, isFetching, isError } = useGetEventsQuery({
    ...fetchEventsParams,
    limit: FETCH_EVENTS_LIMIT,
  });

  return (
    <EventsContext.Provider
      value={{
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
