import { createApi } from "@reduxjs/toolkit/query/react";
import type { Auth } from "@types";
import { TAG, REDUCER, CACHE_KEYS } from "../constants";
import { baseQuery } from "./baseQuery";

export const authApi = createApi({
  reducerPath: REDUCER.AUTH,
  tagTypes: [TAG.AUTH],
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<Auth, { login: string; password: string }>({
      query: (body) => ({
        body,
        url: "auth/login",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
export const LOGIN_CACHE_KEY = CACHE_KEYS.LOGIN;
export default { authApi };
