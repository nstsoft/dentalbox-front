import { createApi } from "@reduxjs/toolkit/query/react";

import { REDUCER, DENTAL_MAP_TAG } from "../constants";
import { baseQuery } from "./baseQuery";
import type { DentalMapType, Chart } from "@types";

export const dentalMapApi = createApi({
  reducerPath: REDUCER.DENTAL_MAP,
  tagTypes: Object.values(DENTAL_MAP_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getDentalMap: builder.query<DentalMapType, string>({
      query: (id) => `/dental-map/${id}`,
      providesTags: () => [{ type: DENTAL_MAP_TAG.DENTAL_MAP_RECORD }],
    }),
    updateDentalMap: builder.mutation<
      Partial<Chart>,
      { chart: Partial<Chart>; patientId: string }
    >({
      query: ({ chart, patientId }) => ({
        url: `/dental-map/${patientId}`,
        method: "PATCH",
        body: chart,
      }),
    }),
  }),
});

export const { useGetDentalMapQuery, useUpdateDentalMapMutation } =
  dentalMapApi;

export default { dentalMapApi };
