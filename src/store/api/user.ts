import { createApi } from "@reduxjs/toolkit/query/react";
import type { User, Workspace } from "@types";
import { USER_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

type UserListFilter = {
  search?: string;
  roles?: string[];
  verified?: string;
};

export const userApi = createApi({
  reducerPath: REDUCER.USER,
  tagTypes: Object.values(USER_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<{ user: User; workspace: Workspace }, void>({
      query: () => `/user/me`,
      providesTags: () => [{ type: USER_TAG.USER }],
    }),
    getUserList: builder.query<
      { count: number; data: User[] },
      { skip: number; limit: number; filter?: UserListFilter }
    >({
      query: (params) => {
        console.log(params);
        let quey = "";
        if (params.filter?.verified) {
          quey += `&verified=${params.filter?.verified}`;
        }
        if (params.filter?.search) {
          quey += `&search=${params.filter?.search}`;
        }
        params.filter?.roles?.map((el) => {
          quey += `&role=${el}`;
        });

        return `/user?skip=${params.skip ?? 0}&limit=${
          params.limit ?? 20
        }${quey}`;
      },

      providesTags: () => [{ type: USER_TAG.USER_LIST }],
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

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useLazyConfirmOtpQuery,
  useGetUserListQuery,
} = userApi;

export default { userApi };
