import { api } from "../index";
import { DetailedEvent, Event, GetEventsParams } from "./types";

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], GetEventsParams>({
      query: (params) => ({
        method: "GET",
        url: "/events",
        params,
      }),
    }),

    getFeaturedEvents: builder.query<Event[], GetEventsParams>({
      query: (params) => ({
        method: "GET",
        url: "/events/featured",
        params: params,
      }),
    }),

    getEvent: builder.query<DetailedEvent, string>({
      query: (id) => `/events/${id}`,
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetFeaturedEventsQuery,
  useGetEventQuery,
} = eventsApi;
