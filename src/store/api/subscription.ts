import { createApi } from "@reduxjs/toolkit/query/react";
import type { SubscriptionResponse } from "@types";
import { TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const subscriptionApi = createApi({
  reducerPath: REDUCER.SUBSCRIPTION,
  tagTypes: [TAG.SUBSCRIPTION, TAG.INTENT],
  baseQuery,
  endpoints: (builder) => ({
    getMySubscription: builder.query<SubscriptionResponse, void>({
      query: () => `/subscription`,
      providesTags: () => [{ type: TAG.SUBSCRIPTION }],
    }),
    createPaymentIntent: builder.query<
      { id: string; client_secret: string },
      void
    >({
      query: () => `/payment/create-payment-intent`,
      providesTags: () => [{ type: TAG.INTENT }],
    }),
  }),
});

export const { useGetMySubscriptionQuery, useLazyCreatePaymentIntentQuery } =
  subscriptionApi;

export default { subscriptionApi };
