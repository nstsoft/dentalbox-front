import { createApi } from "@reduxjs/toolkit/query/react";
import type { Anamnesis, AnamnesisData } from "@types";
import { ANAMNESIS_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

type UpdateAnamnesis = {
  patient: string;
  data: AnamnesisData;
};

export const anamnesisApi = createApi({
  reducerPath: REDUCER.ANAMNESIS,
  tagTypes: Object.values(ANAMNESIS_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getAnamnesis: builder.query<Anamnesis, string>({
      query: (patient) => `/anamnesis/${patient}`,
      providesTags: () => [{ type: ANAMNESIS_TAG.ANAMNESIS }],
    }),
    updateAnamnesis: builder.mutation<void, UpdateAnamnesis>({
      query: ({ patient, data }) => ({
        url: `/anamnesis/${patient}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ANAMNESIS_TAG.ANAMNESIS],
    }),
  }),
});

export const { useGetAnamnesisQuery, useUpdateAnamnesisMutation } =
  anamnesisApi;
