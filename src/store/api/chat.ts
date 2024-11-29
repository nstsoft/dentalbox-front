import { createApi } from "@reduxjs/toolkit/query/react";
import type { RoomResponse, ConnectionResponse } from "@types";
import { CHAT_TAG, REDUCER } from "../constants";
import { chatBaseQuery } from "./baseQuery";

export const chatApi = createApi({
  reducerPath: REDUCER.CHAT,
  tagTypes: Object.values(CHAT_TAG),
  baseQuery: chatBaseQuery,
  endpoints: (builder) => ({
    getRooms: builder.query<RoomResponse[], void>({
      query: () => `/room`,
      providesTags: () => [{ type: CHAT_TAG.ROOMS }],
    }),

    getConnections: builder.query<ConnectionResponse[], void>({
      query: () => `/connection`,
      providesTags: () => [{ type: CHAT_TAG.CONNECTIONS }],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetConnectionsQuery,
  useLazyGetConnectionsQuery,
} = chatApi;
