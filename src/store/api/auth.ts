import { createApi } from "@reduxjs/toolkit/query/react";
import type { Auth, RegisterData } from "@types";
import { AUTH_TAG, REDUCER, CACHE_KEYS } from "../constants";
import { baseQuery } from "./baseQuery";

export const authApi = createApi({
  reducerPath: REDUCER.AUTH,
  tagTypes: Object.keys(AUTH_TAG),
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<Auth, { login: string; password: string }>({
      query: (body) => ({ body, url: "auth/login", method: "POST" }),
    }),
    register: builder.mutation<Auth, RegisterData>({
      query: (body) => ({ body, url: "auth/register", method: "POST" }),
    }),

    loginWithGoogle: builder.query<void, void>({ query: () => "/auth/google" }),
  }),
});

export const {
  useLoginMutation,
  useLazyLoginWithGoogleQuery,
  useRegisterMutation,
} = authApi;
export const LOGIN_CACHE_KEY = CACHE_KEYS.LOGIN;
export default { authApi };
