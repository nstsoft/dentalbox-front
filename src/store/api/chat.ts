import { createApi } from "@reduxjs/toolkit/query/react";
import type { RoomResponse, ConnectionResponse, RoomRequest } from "@types";
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

    createRoom: builder.mutation<void, RoomRequest>({
      query: (body) => ({ url: "/room", method: "POST", body }),
      invalidatesTags: [CHAT_TAG.ROOMS],
    }),

    addUsersToRoom: builder.mutation<
      void,
      { roomId: string; userids: string[] }
    >({
      query: ({ roomId, userids }) => ({
        url: `/room/${roomId}/add-users`,
        method: "PATCH",
        body: { userids },
      }),
      invalidatesTags: [CHAT_TAG.ROOMS],
    }),

    leaveTheRoom: builder.mutation<void, string>({
      query: (roomId) => ({
        url: `/room/${roomId}/leave`,
        method: "PATCH",
      }),
      invalidatesTags: [CHAT_TAG.ROOMS],
    }),

    deleteTheRoom: builder.mutation<void, string>({
      query: (roomId) => ({ url: `/room/${roomId}`, method: "DELETE" }),
      invalidatesTags: [CHAT_TAG.ROOMS],
    }),

    transferRoomOwnership: builder.mutation<
      void,
      { roomId: string; owner: string }
    >({
      query: ({ roomId, owner }) => ({
        url: `/room/${roomId}/transfer-ownership`,
        method: "PATCH",
        body: { owner },
      }),
      invalidatesTags: [CHAT_TAG.ROOMS],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetConnectionsQuery,
  useLazyGetConnectionsQuery,
  useCreateRoomMutation,
  useAddUsersToRoomMutation,
  useLeaveTheRoomMutation,
  useDeleteTheRoomMutation,
  useTransferRoomOwnershipMutation,
} = chatApi;
