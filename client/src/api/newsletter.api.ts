import { SubscribeParams, Subscriber } from "@/types/newsletter.type";
import { api } from ".";

export const newsletterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<Subscriber, SubscribeParams>({
      query: (params) => ({
        method: "POST",
        url: "/newsletter/subscribe",
        body: params,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = newsletterApi;
