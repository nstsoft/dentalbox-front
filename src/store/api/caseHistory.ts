import { createApi } from "@reduxjs/toolkit/query/react";
import type { HistoryResponse } from "@types";
import { DISEASE_HISTORY_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import { createQueryStringFromObject } from "@utils";

type ListProps = { patientId: string; from?: string | null; to?: string };
type ListResponse = { count: number; data: HistoryResponse[] };

export const historyApi = createApi({
  reducerPath: REDUCER.HISTORY,
  tagTypes: Object.values(DISEASE_HISTORY_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getHistoryItems: builder.query<ListResponse, ListProps>({
      query: ({ patientId, from, to }) =>
        `/caseHistory?patient=${patientId}${createQueryStringFromObject({
          from,
          to,
        })}`,
      providesTags: () => [{ type: DISEASE_HISTORY_TAG.HISTORY }],
    }),
    createHistoryItem: builder.mutation<HistoryResponse, string>({
      query: (id) => `/caseHistory?patient=${id}`,
      invalidatesTags: [DISEASE_HISTORY_TAG.HISTORY],
    }),
  }),
});

export const { useLazyGetHistoryItemsQuery, useGetHistoryItemsQuery } =
  historyApi;

export default { historyApi };
