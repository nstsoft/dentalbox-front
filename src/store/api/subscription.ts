import { createApi } from "@reduxjs/toolkit/query/react";
import type { SubscriptionResponse } from "@types";
import { SUBSCRIPTION_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

type CreatePaymentParam = { id: string; client_secret: string };
type GetSecretParam = { type: "setup" | "payment"; clientSecret: string };

export const subscriptionApi = createApi({
  reducerPath: REDUCER.SUBSCRIPTION,
  tagTypes: Object.values(SUBSCRIPTION_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMySubscription: builder.query<SubscriptionResponse, void>({
      query: () => `/subscription`,
      providesTags: () => [{ type: SUBSCRIPTION_TAG.SUBSCRIPTION }],
    }),
    createPaymentIntent: builder.query<CreatePaymentParam, void>({
      query: () => `/payment/create-payment-intent`,
      providesTags: () => [{ type: SUBSCRIPTION_TAG.INTENT }],
    }),
    getClientSecret: builder.query<GetSecretParam, void>({
      query: () => `/payment/client-secret`,
      providesTags: () => [{ type: SUBSCRIPTION_TAG.SECRET }],
    }),
  }),
});

export const { useLazyGetMySubscriptionQuery, useGetClientSecretQuery, useGetMySubscriptionQuery } =
  subscriptionApi;

export default { subscriptionApi };
