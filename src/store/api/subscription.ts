import { createApi } from "@reduxjs/toolkit/query/react";
import type { SubscriptionResponse } from "@types";
import { SUBSCRIPTION_TAG, REDUCER, WORKSPACE_TAG } from "../constants";
import { baseQuery } from "./baseQuery";

type ChangePlan = { priceId: string };

console.log(Object.values({ ...WORKSPACE_TAG, ...SUBSCRIPTION_TAG }));

export const subscriptionApi = createApi({
  reducerPath: REDUCER.SUBSCRIPTION,
  tagTypes: Object.values({ ...WORKSPACE_TAG, ...SUBSCRIPTION_TAG }),
  baseQuery,
  endpoints: (builder) => ({
    getMySubscription: builder.query<SubscriptionResponse, void>({
      query: () => `/subscription`,
      providesTags: () => [{ type: SUBSCRIPTION_TAG.SUBSCRIPTION }],
    }),
    changeSubscriptionPlan: builder.mutation<unknown, ChangePlan>({
      query: (body) => ({
        url: `/subscription/change-plan`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: () => [
        WORKSPACE_TAG.WORKSPACE,
        SUBSCRIPTION_TAG.SUBSCRIPTION,
      ],
    }),
  }),
});

export const {
  useLazyGetMySubscriptionQuery,
  useGetMySubscriptionQuery,
  useChangeSubscriptionPlanMutation,
} = subscriptionApi;

export default { subscriptionApi };
