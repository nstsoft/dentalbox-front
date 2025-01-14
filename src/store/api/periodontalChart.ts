import { createApi } from "@reduxjs/toolkit/query/react";
import { PERIODONTAL_CHART_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import type {
  DeepPartial,
  PeriodontalChart,
  PeriodontalChartResponse,
} from "@types";

export const periodontalChartApi = createApi({
  reducerPath: REDUCER.PERIODONTAL_CHART,
  tagTypes: Object.values(PERIODONTAL_CHART_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getPeriodontalChart: builder.query<PeriodontalChartResponse, string>({
      query: (patient) => `/periodontal-chart/${patient}`,
      providesTags: () => [{ type: PERIODONTAL_CHART_TAG.PERIODONTAL_CHART }],
    }),
    updatePeriodontalChart: builder.mutation<
      void,
      { patient: string; notes: string; chart: DeepPartial<PeriodontalChart> }
    >({
      query: ({ patient, ...body }) => ({
        url: `/periodontal-chart/${patient}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetPeriodontalChartQuery,
  useUpdatePeriodontalChartMutation,
} = periodontalChartApi;

export default { periodontalChartApi };
