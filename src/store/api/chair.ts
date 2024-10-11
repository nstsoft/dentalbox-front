import { createApi } from "@reduxjs/toolkit/query/react";
import { CHAIR_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import type { ChairSummaryListItem } from "@types";

export const chairApi = createApi({
  reducerPath: REDUCER.CHAIR,
  tagTypes: Object.values(CHAIR_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getChairSummary: builder.query<ChairSummaryListItem[], void>({
      query: () => `/chair/summary`,
      providesTags: () => [{ type: CHAIR_TAG.CHAIR_SUMMARY }],
    }),
  }),
});

export const { useGetChairSummaryQuery } = chairApi;

export default { chairApi };
