import { createApi } from "@reduxjs/toolkit/query/react";
import type { Cabinet, CreateCabinet, CabinetSummaryListItem } from "@types";
import { REDUCER, CABINET_TAG } from "../constants";
import { baseQuery } from "./baseQuery";

type CabinetNameFilter = {
  search?: string;
};

export const cabinetApi = createApi({
  reducerPath: REDUCER.CABINET,
  tagTypes: Object.values(CABINET_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getMyCabinets: builder.query<
      { count: number; data: Cabinet[] },
      { skip: number; limit: number; filter?: CabinetNameFilter }
    >({
      query: (params) => {
        let quey = "";
        if (params.filter?.search) {
          quey += `&search=${params.filter?.search}`;
        }

        return `/cabinet?skip=${params.skip ?? 0}&limit=${
          params.limit ?? 20
        }${quey}`;
      },
      providesTags: () => [{ type: CABINET_TAG.CABINET_LIST }],
    }),
    createCabinet: builder.mutation<void, CreateCabinet>({
      query: ({ image, ...body }) => {
        const formData = new FormData();
        if (image) {
          formData.append("file", image);
        }

        formData.append("data", JSON.stringify({ ...body }));

        return { body: formData, url: "/cabinet", method: "POST" };
      },
      invalidatesTags: [CABINET_TAG.CABINET_LIST]
    }),
    updateCabinet: builder.mutation<void, CreateCabinet & { _id: string }>({
      query: ({ image, ...body }) => {
        const formData = new FormData();
        if (image) {
          formData.append("file", image);
        }

        formData.append("data", JSON.stringify({ ...body }));

        return { body: formData, url: "/cabinet", method: "PATCH" };
      },
      invalidatesTags: [CABINET_TAG.CABINET_LIST]
    }),
    getCabinetSummary: builder.query<CabinetSummaryListItem[], void>({
      query: () => "/cabinet/summary",
      providesTags: () => [{ type: CABINET_TAG.CABINET_SUMMARY }],
    }),
    deleteCabinet: builder.mutation<void, string>({
      query: (cabinetId) => ({ url: `/cabinet/${cabinetId}`, method: "DELETE" }),
      invalidatesTags: [CABINET_TAG.CABINET_LIST]
    }),
  }),
});

export const {
  useGetMyCabinetsQuery,
  useCreateCabinetMutation,
  useGetCabinetSummaryQuery,
  useUpdateCabinetMutation,
  useDeleteCabinetMutation
} = cabinetApi;

export default { cabinetApi };
