import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "@types";
import { TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const userApi = createApi({
  reducerPath: REDUCER.USER,
  tagTypes: [TAG.USER],
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => `/user/me`,
      providesTags: () => [{ type: TAG.USER }],
    }),
  }),
});

export const { useGetMeQuery } = userApi;

export default { userApi };
