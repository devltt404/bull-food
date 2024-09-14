import { ApiResponse } from "../../types/api.type";
import { GetEventsParams, GetEventsResponse } from "../../types/events.type";
import { api } from "./index";

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<ApiResponse<GetEventsResponse>, GetEventsParams>({
      query: (params) => ({
        method: "GET",
        url: "/events",
        params: params,
      }),
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
