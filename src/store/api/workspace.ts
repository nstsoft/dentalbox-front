import { createApi } from "@reduxjs/toolkit/query/react";
import type { Workspace } from "@types";
import { WORKSPACE_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const workspaceApi = createApi({
  reducerPath: REDUCER.WORKSPACE,
  tagTypes: Object.values(WORKSPACE_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMyWorkspaces: builder.query<Workspace[], void>({
      query: () => `/workspace`,
      providesTags: () => [{ type: WORKSPACE_TAG.WORKSPACE }],
    }),
  }),
});

export const { useLazyGetMyWorkspacesQuery } = workspaceApi;

export default { workspaceApi };
