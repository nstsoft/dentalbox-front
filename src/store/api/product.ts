import { createApi } from "@reduxjs/toolkit/query/react";
import { PRODUCT_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import type { Product } from "@types";

export const productApi = createApi({
  reducerPath: REDUCER.PRODUCT,
  tagTypes: Object.values(PRODUCT_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/product`,
      providesTags: () => [{ type: PRODUCT_TAG.PRODUCT }],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;

export default { productApi };
