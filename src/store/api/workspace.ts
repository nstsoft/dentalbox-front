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
    updateWorkspace: builder.mutation<
      void,
      { name: string; notes?: string; image?: File }
    >({
      query: ({ image, ...body }) => {
        const formData = new FormData();
        if (image) {
          formData.append("file", image);
        }

        formData.append("data", JSON.stringify(body));
        return {
          url: "/workspace",
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useLazyGetMyWorkspacesQuery,
  useGetMyWorkspacesQuery,
  useUpdateWorkspaceMutation,
} = workspaceApi;

export default { workspaceApi };
