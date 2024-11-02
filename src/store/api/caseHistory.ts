import { createApi } from "@reduxjs/toolkit/query/react";
import type { WorkspaceMetadata } from "@types";
import { DISEASE_HISTORY_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";

export const historyApi = createApi({
  reducerPath: REDUCER.HISTORY,
  tagTypes: Object.values(DISEASE_HISTORY_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getHistoryItems: builder.query<WorkspaceMetadata, string>({
      query: (id) => `/caseHistory?patient=${id}`,
      providesTags: () => [{ type: DISEASE_HISTORY_TAG.HISTORY }],
    }),
    createHistoryItem: builder.mutation<WorkspaceMetadata, string>({
      query: (id) => `/caseHistory?patient=${id}`,
      invalidatesTags: [DISEASE_HISTORY_TAG.HISTORY],
    }),
  }),
});

export const { useGetHistoryItemsQuery } = historyApi;

export default { historyApi };
