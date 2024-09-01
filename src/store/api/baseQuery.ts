import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers) => {
    const token = localStorage.getItem("auth-token");
    const workspace = localStorage.getItem("workspace");

    if (token) {
      headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
    }
    if (workspace) {
      headers.set("workspace", JSON.parse(workspace));
    }

    return headers;
  },
});
