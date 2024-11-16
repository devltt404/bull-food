import {
  SubscribeParams,
  Subscriber,
  unSubscribeParams,
} from "@/api/newsletter/types";
import { api } from "..";

export const newsletterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<Subscriber, SubscribeParams>({
      query: (params) => ({
        method: "POST",
        url: "/newsletter/subscribe",
        body: params,
      }),
    }),
    unsubscribe: builder.mutation<Subscriber, unSubscribeParams>({
      query: (params) => ({
        method: "POST",
        url: "/newsletter/unsubscribe",
        body: params,
      }),
    }),
  }),
});

export const { useSubscribeMutation, useUnsubscribeMutation } = newsletterApi;
