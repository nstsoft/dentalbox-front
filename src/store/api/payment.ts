import { createApi } from "@reduxjs/toolkit/query/react";
import type { Invoice, Payment } from "@types";
import { REDUCER, PAYMENT_TAG } from "../constants";
import { baseQuery } from "./baseQuery";
import { createQueryStringFromObject } from "@utils";

type CreatePaymentParam = { id: string; client_secret: string };
type GetSecretParam = { type: "setup" | "payment"; clientSecret: string };

export const paymentApi = createApi({
  reducerPath: REDUCER.PAYMENT,
  tagTypes: Object.values(PAYMENT_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMyPaymentMethods: builder.query<Payment[], void>({
      query: () => `/payment/payment-methods`,
      providesTags: () => [{ type: PAYMENT_TAG.PAYMENT }],
    }),
    deletePaymentMethod: builder.mutation<Payment[], string>({
      query: (cardId) => ({ url: `/payment/${cardId}`, method: "DELETE" }),
    }),
    setDefaultPaymentMethod: builder.mutation<Payment[], string>({
      query: (cardId) => ({ url: `/payment/${cardId}`, method: "PATCH" }),
    }),
    getInvoiceList: builder.mutation<
      { hasMore: boolean; data: Invoice[] },
      { startingAfter?: string; limit: string }
    >({
      query: ({ startingAfter, limit }) =>
        `/payment/invoices?${createQueryStringFromObject({
          limit,
          startingAfter,
        })}`,
    }),
    createPaymentIntent: builder.query<CreatePaymentParam, void>({
      query: () => `/payment/create-payment-intent`,
      providesTags: () => [{ type: PAYMENT_TAG.INTENT }],
    }),
    getClientSecret: builder.query<GetSecretParam, void>({
      query: () => `/payment/client-secret`,
      providesTags: () => [{ type: PAYMENT_TAG.SECRET }],
    }),
  }),
});

export const {
  useGetMyPaymentMethodsQuery,
  useDeletePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
  useGetInvoiceListMutation,
  useGetClientSecretQuery,
} = paymentApi;

export default { paymentApi };
