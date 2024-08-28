import { createApi } from "@reduxjs/toolkit/query/react";
import { TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import type { Plan } from "@types";

export const planApi = createApi({
  reducerPath: REDUCER.PLAN,
  tagTypes: [TAG.PLAN],
  baseQuery,
  endpoints: (builder) => ({
    getPlans: builder.query<Plan[], void>({
      query: () => `/plan`,
      providesTags: () => [{ type: TAG.PLAN }],
    }),
  }),
});

export const { useGetPlansQuery } = planApi;

export default { planApi };
