import { createApi } from "@reduxjs/toolkit/query/react";
import { TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import type { Product } from "@types";

export const productApi = createApi({
  reducerPath: REDUCER.PRODUCT,
  tagTypes: [TAG.PRODUCT],
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/product`,
      providesTags: () => [{ type: TAG.PRODUCT }],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;

export default { productApi };
