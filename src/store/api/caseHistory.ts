import { createApi } from "@reduxjs/toolkit/query/react";
import type { HistoryResponse } from "@types";
import { DISEASE_HISTORY_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import { createQueryStringFromObject } from "@utils";
import { HistoryData } from "@types";

type ListProps = { patientId: string; from?: string | null; to?: string };
type ListResponse = { count: number; data: HistoryResponse[] };

type CreateHistoryData = Omit<HistoryData, "id" | "date" | "files"> & {
  patient: string;
  date: string;
  files?: File[];
};

type CreateHistoryItem = Omit<
  { [key: string]: string | File[] },
  keyof CreateHistoryData
> &
  CreateHistoryData;

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
    createHistoryItem: builder.mutation<HistoryResponse, CreateHistoryItem>({
      query: ({ files, patient, ...data }) => {
        const formData = new FormData();
        if (files?.length) {
          files.forEach((file) => formData.append("files", file));
        }

        formData.append("data", JSON.stringify(data));
        return {
          body: formData,
          url: `/caseHistory/${patient}`,
          method: "POST",
        };
      },
      invalidatesTags: [DISEASE_HISTORY_TAG.HISTORY],
    }),
  }),
});

export const {
  useLazyGetHistoryItemsQuery,
  useGetHistoryItemsQuery,
  useCreateHistoryItemMutation,
} = historyApi;

export default { historyApi };
