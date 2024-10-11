import { createApi } from "@reduxjs/toolkit/query/react";
import type { CreatePatient, Patient, PatientSummaryListItem } from "@types";
import { REDUCER, PATIENT_TAG } from "../constants";
import { baseQuery } from "./baseQuery";

type PatientNameFilter = { search?: string };

export const patientApi = createApi({
  reducerPath: REDUCER.PATIENT,
  tagTypes: Object.values(PATIENT_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMyPatients: builder.query<
      { count: number; data: Patient[] },
      { skip: number; limit: number; filter?: PatientNameFilter }
    >({
      query: (params) => {
        let quey = "";
        if (params.filter?.search) {
          quey += `&search=${params.filter?.search}`;
        }

        return `/patient?skip=${params.skip ?? 0}&limit=${
          params.limit ?? 20
        }${quey}`;
      },
      providesTags: () => [{ type: PATIENT_TAG.PATIENT_LIST }],
    }),
    createPatient: builder.mutation<unknown, CreatePatient>({
      query: ({ image, ...body }) => {
        const formData = new FormData();
        if (image) {
          formData.append("file", image);
        }

        formData.append(
          "data",
          JSON.stringify({ ...body, dob: body.dob.toString() })
        );

        return { body: formData, url: "/patient", method: "POST" };
      },
    }),
    getPatientById: builder.query<Patient, string>({
      query: (id) => `/patient/${id}`,
      providesTags: () => [{ type: PATIENT_TAG.PATIENT_RECORD }],
    }),
    updatePatient: builder.mutation<unknown, Patient>({
      query: ({ image, ...body }) => {
        const formData = new FormData();
        if (image) {
          formData.append("file", image);
        }

        formData.append(
          "data",
          JSON.stringify({ ...body, dob: body.dob.toString() })
        );

        return { body: formData, url: `/patient${body._id}`, method: "PATCH" };
      },
    }),
    getPatientSummary: builder.query<PatientSummaryListItem[], void>({
      query: () => "/patient/summary",
      providesTags: () => [{ type: PATIENT_TAG.PATIENT_SUMMARY }],
    }),
  }),
});

export const {
  useGetMyPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useGetPatientSummaryQuery,
} = patientApi;

export default { patientApi };
