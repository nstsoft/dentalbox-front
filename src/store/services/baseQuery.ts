import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      return headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
    }
    return headers;
  },
});
