/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query";
import { AUTH_TOKEN, REFRESH_TOKEN, WORKSPACE } from "@utils";

const buildQueryInstance = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const cookiesList = document.cookie.split("; ");
      const token = cookiesList
        .find((item) => item.startsWith(`${AUTH_TOKEN}=`))
        ?.split("=")[1];
      const refreshToken = cookiesList
        .find((item) => item.startsWith(`${REFRESH_TOKEN}=`))
        ?.split("=")[1];
      const workspace = localStorage.getItem(WORKSPACE);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (workspace) {
        headers.set(WORKSPACE, JSON.parse(workspace));
      }
      if (refreshToken) {
        headers.set(REFRESH_TOKEN, refreshToken);
      }

      return headers;
    },
  });
};

const buildQuery = (baseUrl: string): BaseQueryFn => {
  let baseQueryInstance = buildQueryInstance(baseUrl);
  const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
    const result: any = await baseQueryInstance(args, api, extraOptions);
    if (result?.error?.data?.error?.type !== "Expired") {
      return result;
    }

    try {
      if (baseUrl === import.meta.env.VITE_CHAT_API_URL) {
        baseQueryInstance = buildQueryInstance(import.meta.env.VITE_API_URL);
      }

      const response = await baseQueryInstance(
        "/auth/refresh-token",
        api,
        extraOptions
      );

      const { data } = response as {
        data: { authToken: string; refreshToken: string };
      };

      document.cookie = `${REFRESH_TOKEN}=${data.refreshToken}; path=/`;
      document.cookie = `${AUTH_TOKEN}=${data.authToken}; path=/`;
    } catch (error: any) {
      throw new Error(error);
    }

    return baseQuery(args, api, extraOptions);
  };
  return baseQuery;
};

export const baseQuery = buildQuery(import.meta.env.VITE_API_URL);
export const chatBaseQuery = buildQuery(import.meta.env.VITE_CHAT_API_URL);
