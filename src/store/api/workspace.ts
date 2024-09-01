import { createApi } from "@reduxjs/toolkit/query/react";
import type { Workspace } from "@types";
import { TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const workspaceApi = createApi({
  reducerPath: REDUCER.WORKSPACE,
  tagTypes: [TAG.WORKSPACE],
  baseQuery,
  endpoints: (builder) => ({
    getMyWorkspaces: builder.query<Workspace[], void>({
      query: () => `/workspace`,
      providesTags: () => [{ type: TAG.WORKSPACE }],
    }),
  }),
});

export const { useLazyGetMyWorkspacesQuery } = workspaceApi;

export default { workspaceApi };
