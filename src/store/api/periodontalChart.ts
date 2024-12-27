import { createApi } from "@reduxjs/toolkit/query/react";
import { PERIODONTAL_CHART_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import type { PeriodontalChartResponse } from "@types";

export const periodontalChartApi = createApi({
  reducerPath: REDUCER.PERIODONTAL_CHART,
  tagTypes: Object.values(PERIODONTAL_CHART_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getPeriodontalChart: builder.query<PeriodontalChartResponse, string>({
      query: (patient) => `/periodontal-chart/${patient}`,
      providesTags: () => [{ type: PERIODONTAL_CHART_TAG.PERIODONTAL_CHART }],
    }),
  }),
});

export const { useGetPeriodontalChartQuery } = periodontalChartApi;

export default { periodontalChartApi };
