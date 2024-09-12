import { createApi } from "@reduxjs/toolkit/query/react";
import type { SubscriptionResponse } from "@types";
import { SUBSCRIPTION_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const subscriptionApi = createApi({
  reducerPath: REDUCER.SUBSCRIPTION,
  tagTypes: Object.values(SUBSCRIPTION_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMySubscription: builder.query<SubscriptionResponse, void>({
      query: () => `/subscription`,
      providesTags: () => [{ type: SUBSCRIPTION_TAG.SUBSCRIPTION }],
    }),
    createPaymentIntent: builder.query<
      { id: string; client_secret: string },
      void
    >({
      query: () => `/payment/create-payment-intent`,
      providesTags: () => [{ type: SUBSCRIPTION_TAG.INTENT }],
    }),
    getClientSecret: builder.query<
      { type: "setup" | "payment"; clientSecret: string },
      void
    >({
      query: () => `/payment/client-secret`,
      providesTags: () => [{ type: SUBSCRIPTION_TAG.INTENT }],
    }),
  }),
});

export const { useLazyGetMySubscriptionQuery, useGetClientSecretQuery } =
  subscriptionApi;

export default { subscriptionApi };
