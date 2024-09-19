import { createApi } from "@reduxjs/toolkit/query/react";
import type { Payment } from "@types";
import { REDUCER, PAYMENT_TAG } from "../constants";
import { baseQuery } from "./baseQuery";

export const paymentApi = createApi({
  reducerPath: REDUCER.PAYMENT,
  tagTypes: Object.values(PAYMENT_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMyPaymentMethods: builder.query<Payment[], void>({
      query: () => `/payment/payment-methods`,
      providesTags: () => [{ type: PAYMENT_TAG.PAYMENT }],
    }),
  }),
});

export const { useGetMyPaymentMethodsQuery } = paymentApi;

export default { paymentApi };
