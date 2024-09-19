import { createApi } from "@reduxjs/toolkit/query/react";
import type { User, Workspace } from "@types";
import { USER_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const userApi = createApi({
  reducerPath: REDUCER.USER,
  tagTypes: Object.values(USER_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<
      { user: User; workspace: Workspace },
      void
    >({
      query: () => `/user/me`,
      providesTags: () => [{ type: USER_TAG.USER }],
    }),
    confirmOtp: builder.query<unknown, string>({
      query: (otp) => ({
        body: { otp },
        url: `/user/verify-otp`,
        method: "PATCH",
      }),

      providesTags: () => [{ type: USER_TAG.CONFIRM_OTP }],
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery, useLazyConfirmOtpQuery } =
  userApi;

export default { userApi };
