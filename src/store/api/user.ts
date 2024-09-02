import { createApi } from "@reduxjs/toolkit/query/react";
import type { User, Workspace, Subscription } from "@types";
import { TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const userApi = createApi({
  reducerPath: REDUCER.USER,
  tagTypes: [TAG.USER],
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<
      { user: User; workspace: Workspace; subscription: Subscription },
      void
    >({
      query: () => `/user/me`,
      providesTags: () => [{ type: TAG.USER }],
    }),
    confirmOtp: builder.query<unknown, string>({
      query: (otp) => ({
        body: { otp },
        url: `/user/verify-otp`,
        method: "PATCH",
      }),

      providesTags: () => [{ type: TAG.USER }],
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery, useLazyConfirmOtpQuery } =
  userApi;

export default { userApi };
