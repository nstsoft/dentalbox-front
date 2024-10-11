import { createApi } from "@reduxjs/toolkit/query/react";
import type { Appointment, AppointmentListQuery } from "@types";
import { REDUCER, APPOINTMENT_TAG } from "../constants";
import { baseQuery } from "./baseQuery";
import { createQueryStringFromObject } from "@utils";

export const appointmentApi = createApi({
  reducerPath: REDUCER.APPOINTMENT,
  tagTypes: Object.values(APPOINTMENT_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], AppointmentListQuery>({
      query: (params) => {
        return `/appointment?${createQueryStringFromObject(params)}`;
      },
      providesTags: () => [{ type: APPOINTMENT_TAG.APPOINTMENT_LIST }],
    }),
  }),
});

export const { useGetAppointmentsQuery } = appointmentApi;

export default { appointmentApi };
