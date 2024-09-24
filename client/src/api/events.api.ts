import { Event, GetEventsParams } from "../types/event.type";
import { api } from "./index";

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
  }),
});

export const { useGetEventsQuery, useGetFeaturedEventsQuery } = eventsApi;
