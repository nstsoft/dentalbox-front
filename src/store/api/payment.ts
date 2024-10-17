import { createApi } from "@reduxjs/toolkit/query/react";
import type { Payment } from "@types";
import { REDUCER, PAYMENT_TAG } from "../constants";
import { baseQuery } from "./baseQuery";
import { createQueryStringFromObject } from "@utils";

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
    getInvoiceList: builder.query<unknown, { skip: number; limit: number }>({
      query: ({ skip, limit }) =>
        `/payment/invoices?${createQueryStringFromObject({
          skip,
          limit,
        })}`,
      providesTags: () => [{ type: PAYMENT_TAG.INVOICE_LIST }],
    }),
  }),
});

export const {
  useGetMyPaymentMethodsQuery,
  useDeletePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
  useGetInvoiceListQuery,
} = paymentApi;

export default { paymentApi };
