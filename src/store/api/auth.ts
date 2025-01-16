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
      query: ({ user, workspace, productId, priceId, workspaceImage }) => {
        const formData = new FormData();
        if (workspaceImage) {
          formData.append("file", workspaceImage);
        }

        const stringData = JSON.stringify({
          workspace: {
            name: workspace.name,
            description: workspace.description,
          },
          user,
          productId,
          priceId,
        });

        formData.append("data", stringData);

        return {
          body: formData,
          url: "auth/register",
          method: "POST",
        };
      },
    }),
    loginWithGoogle: builder.query<void, void>({ query: () => "/auth/google" }),
    requestResetPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: "auth/request-reset-password",
        method: "PATCH",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<void, { password: string; token: string }>({
      query: ({ password, token }) => ({
        url: `auth/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyLoginWithGoogleQuery,
  useRegisterMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
export const LOGIN_CACHE_KEY = CACHE_KEYS.LOGIN;
export default { authApi };
