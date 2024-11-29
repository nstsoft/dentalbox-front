/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query";

const buildQueryInstance = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("auth-token");
      const refreshToken = localStorage.getItem("refresh-token");
      const workspace = localStorage.getItem("workspace");

      if (token) {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      }
      if (workspace) {
        headers.set("workspace", JSON.parse(workspace));
      }
      if (refreshToken) {
        headers.set("refresh-token", JSON.parse(refreshToken));
      }

      return headers;
    },
  });
};

const buildQuery = (baseUrl: string): BaseQueryFn => {
  const baseQueryInstance = buildQueryInstance(baseUrl);
  const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
    const result: any = await baseQueryInstance(args, api, extraOptions);
    if (result?.error?.data?.error?.type !== "Expired") {
      return result;
    }

    try {
      const response = await baseQueryInstance(
        "/auth/refresh-token",
        api,
        extraOptions
      );

      const { data } = response as {
        data: { authToken: string; refreshToken: string };
      };

      window.localStorage.setItem(
        "refresh-token",
        JSON.stringify(data.refreshToken)
      );
      window.localStorage.setItem("auth-token", JSON.stringify(data.authToken));
    } catch (error: any) {
      throw new Error(error);
    }

    return baseQuery(args, api, extraOptions);
  };
  return baseQuery;
};

export const baseQuery = buildQuery(import.meta.env.VITE_API_URL);
export const chatBaseQuery = buildQuery(import.meta.env.VITE_CHAT_API_URL);
