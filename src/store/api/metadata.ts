import { createApi } from "@reduxjs/toolkit/query/react";
import type { WorkspaceMetadata } from "@types";
import { METADATA_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const metadataApi = createApi({
  reducerPath: REDUCER.METADATA,
  tagTypes: Object.values(METADATA_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getWorkspaceMetadata: builder.query<WorkspaceMetadata, void>({
      query: () => `/metadata`,
      providesTags: () => [{ type: METADATA_TAG.METADATA }],
    }),
    updateMetadata: builder.mutation<void, Partial<WorkspaceMetadata>>({
      query: (body) => ({
        url: `/metadata`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [METADATA_TAG.METADATA],
    }),
  }),
});

export const {
  useLazyGetWorkspaceMetadataQuery,
  useGetWorkspaceMetadataQuery,
  useUpdateMetadataMutation,
} = metadataApi;

export default { metadataApi };
