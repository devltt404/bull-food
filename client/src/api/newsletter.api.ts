import { ApiResponse } from "types/api.type";
import { SubscribeData, SubscribeParams } from "types/newsletter.type";
import { api } from ".";

export const newsletterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<ApiResponse<SubscribeData>, SubscribeParams>({
      query: (params) => ({
        method: "POST",
        url: "/newsletter/subscribe",
        body: params,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = newsletterApi;