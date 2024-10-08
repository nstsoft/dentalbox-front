import { createApi } from "@reduxjs/toolkit/query/react";
import type { Cabinet, CreateCabinet } from "@types";
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
    createCabinet: builder.mutation<unknown, CreateCabinet>({
      query: ({ image, ...body }) => {
        const formData = new FormData();
        if (image) {
          formData.append("file", image);
        }

        formData.append("data", JSON.stringify({ ...body }));

        return {
          body: formData,
          url: "/cabinet",
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetMyCabinetsQuery, useCreateCabinetMutation } = cabinetApi;

export default { cabinetApi };
