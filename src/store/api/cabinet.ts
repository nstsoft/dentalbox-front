import { createApi } from "@reduxjs/toolkit/query/react";
import type { Cabinet } from "@types";
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
    createCabinet: builder.query<
      unknown,
      {
        name: string;
        phone: string;
        address: string;
        notes: string;
        chairs: string[];
      }
    >({
      query: (body) => ({
        body,
        url: "/cabinet",
        method: "POST",
      }),
      providesTags: () => [{ type: CABINET_TAG.CABINET }],
    }),
  }),
});

export const { useGetMyCabinetsQuery, useLazyCreateCabinetQuery } = cabinetApi;

export default { cabinetApi };
