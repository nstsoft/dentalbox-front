import { createApi } from "@reduxjs/toolkit/query/react";
import type { Service } from "@types";
import { SERVICE_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const serviceApi = createApi({
  reducerPath: REDUCER.SERVICE,
  tagTypes: Object.values(SERVICE_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => `/service`,
      providesTags: () => [{ type: SERVICE_TAG.SERVICE }],
    }),
    addServiceItem: builder.mutation<void, Omit<Service, "_id" | "workspace">>({
      query: (body) => ({ url: "/service", method: "POST", body }),
      invalidatesTags: [SERVICE_TAG.SERVICE],
    }),
    updateServiceItem: builder.mutation<
      Service,
      { _id: string; service: Omit<Service, "_id" | "workspace"> }
    >({
      query: ({ _id, service }) => ({
        url: "/service/" + _id,
        method: "PATCH",
        body: service,
      }),
      invalidatesTags: [SERVICE_TAG.SERVICE],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useAddServiceItemMutation,
  useLazyGetServicesQuery,
  useUpdateServiceItemMutation,
} = serviceApi;

export default { serviceApi };
