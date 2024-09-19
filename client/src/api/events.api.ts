import { ApiResponse } from "../../types/api.type";
import { GetEventsData, GetEventsParams } from "../../types/events.type";
import { api } from "./index";

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<ApiResponse<GetEventsData>, GetEventsParams>({
      query: (params) => ({
        method: "GET",
        url: "/events",
        params,
      }),
    }),

    getFeaturedEvents: builder.query<
      ApiResponse<GetEventsData>,
      GetEventsParams
    >({
      query: (params) => ({
        method: "GET",
        url: "/events/featured",
        params: params,
      }),
    }),
  }),
});

export const { useGetEventsQuery, useGetFeaturedEventsQuery } = eventsApi;
