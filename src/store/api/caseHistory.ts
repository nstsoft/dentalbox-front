import { createApi } from "@reduxjs/toolkit/query/react";
import type { HistoryResponse } from "@types";
import { DISEASE_HISTORY_TAG, REDUCER } from "../constants";
import { baseQuery } from "./baseQuery";
import { HistoryData } from "@types";

type ListProps = { patientId: string };

type CreateHistoryData = Omit<HistoryData, "id" | "date" | "files"> & {
  patient: string;
  date: string;
  files?: File[];
  _id?: string;
};

type CreateHistoryItem = Omit<
  {
    [key: string]:
      | string
      | File[]
      | string[]
      | undefined
      | { _id: string; notes?: string }[];
  },
  keyof CreateHistoryData
> &
  CreateHistoryData;

type UpdateHistoryItem = CreateHistoryItem & {
  selectedFiles?: { _id: string; notes?: string }[];
};

export const historyApi = createApi({
  reducerPath: REDUCER.HISTORY,
  tagTypes: Object.values(DISEASE_HISTORY_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getHistoryItems: builder.query<HistoryResponse[], ListProps>({
      query: ({ patientId }) => `/caseHistory?patient=${patientId}`,
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
    updateHistoryItem: builder.mutation<HistoryResponse, UpdateHistoryItem>({
      query: ({ files, ...data }) => {
        const formData = new FormData();
        if (files?.length) {
          files.forEach((file) => formData.append("files", file));
        }

        formData.append("data", JSON.stringify(data));
        return {
          body: formData,
          url: `/caseHistory`,
          method: "PATCH",
        };
      },
      invalidatesTags: [DISEASE_HISTORY_TAG.HISTORY],
    }),
    deleteHistoryItem: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/caseHistory/${id}`, method: "DELETE" }),
      invalidatesTags: [DISEASE_HISTORY_TAG.HISTORY],
    }),
  }),
});

export const {
  useLazyGetHistoryItemsQuery,
  useGetHistoryItemsQuery,
  useCreateHistoryItemMutation,
  useUpdateHistoryItemMutation,
  useDeleteHistoryItemMutation,
} = historyApi;

export default { historyApi };
