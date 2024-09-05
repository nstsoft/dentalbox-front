import { createApi } from "@reduxjs/toolkit/query/react";
import type { Auth, UserRequest } from "@types";
import { TAG, REDUCER, CACHE_KEYS } from "../constants";
import { baseQuery } from "./baseQuery";
import { WorkspaceForm } from "../../pages";

type RegisterData = {
  user: UserRequest;
  workspace: WorkspaceForm;
  productId: string;
  workspaceImage: string;
  defaultPaymentMethodId: string;
};

export const authApi = createApi({
  reducerPath: REDUCER.AUTH,
  tagTypes: [TAG.AUTH],
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
