import { createApi } from "@reduxjs/toolkit/query/react";
import type { TreatmentPlan } from "@types";
import { TREATMENT_PLAN_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

type UpdateTreatmentPlanItem = {
  plan: string;
  data: Omit<TreatmentPlan, "workspace" | "_id" | "patient">;
};

 type CreateTreatmentPlan = {
  patient: string;
  items: {
    [key: string]: number;
  };
};

export const treatmentPlanApi = createApi({
  reducerPath: REDUCER.TREATMENT_PLAN,
  tagTypes: Object.values(TREATMENT_PLAN_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getTreatmentPlanList: builder.query<TreatmentPlan[], string>({
      query: (patient) => `/treatment-plan/${patient}`,
      providesTags: () => [{ type: TREATMENT_PLAN_TAG.TREATMENT_PLAN }],
    }),
    updateTreatmentPlanItem: builder.mutation<void, UpdateTreatmentPlanItem>({
      query: ({ plan, data }) => ({
        url: `/treatment-plan/${plan}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [TREATMENT_PLAN_TAG.TREATMENT_PLAN],
    }),
    createTreatmentPlan: builder.mutation<void, CreateTreatmentPlan>({
      query: (data) => ({
        url: `/treatment-plan`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [TREATMENT_PLAN_TAG.TREATMENT_PLAN],
    }),
  }),
});

export const {
  useGetTreatmentPlanListQuery,
  useUpdateTreatmentPlanItemMutation,
  useCreateTreatmentPlanMutation,
} = treatmentPlanApi;

export default { treatmentPlanApi };
