import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  RoomResponse,
  ConnectionResponse,
  RoomRequest,
  Stats,
  Message,
} from "@types";
import { CHAT_TAG, REDUCER } from "../constants";
import { chatBaseQuery } from "./baseQuery";
import { createQueryStringFromObject } from "@utils";

type ExclusiveKey = { id?: string; room?: string; timestamp?: number };

type MessageResponse = {
  Items: Message[];
  ExclusiveKey?: ExclusiveKey;
};

type MessagesQuery = { room: string; exclusiveKey?: ExclusiveKey };

export const chatApi = createApi({
  reducerPath: REDUCER.CHAT,
  tagTypes: Object.values(CHAT_TAG),
  baseQuery: chatBaseQuery,
  endpoints: (builder) => ({
    getRooms: builder.query<RoomResponse[], void>({
      query: () => `/room`,
      providesTags: () => [{ type: CHAT_TAG.ROOMS }],
    }),
    getStats: builder.query<Stats, void>({
      query: () => `/message/stats`,
      providesTags: () => [{ type: CHAT_TAG.STATS }],
    }),
    getConnections: builder.query<ConnectionResponse[], void>({
      query: () => `/connection`,
      providesTags: () => [{ type: CHAT_TAG.CONNECTIONS }],
    }),
    createRoom: builder.mutation<void, RoomRequest>({
      query: (body) => ({ url: "/room", method: "POST", body }),
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
    }),

    leaveTheRoom: builder.mutation<void, string>({
      query: (roomId) => ({
        url: `/room/${roomId}/leave`,
        method: "PATCH",
      }),
    }),

    deleteTheRoom: builder.mutation<void, string>({
      query: (roomId) => ({ url: `/room/${roomId}`, method: "DELETE" }),
    }),

    getMessages: builder.query<MessageResponse, MessagesQuery>({
      query: ({ room, exclusiveKey }) => ({
        url: `/message/${room}?${createQueryStringFromObject(
          exclusiveKey ?? {}
        )}`,
      }),
      providesTags: () => [{ type: CHAT_TAG.MESSAGES }],
    }),

    createMessage: builder.mutation<void, { room: string; message: string, files?: File[] }>({
      query: ({ files, room, message }) => {
        const formData = new FormData();
        if (files?.length) {
          files.forEach((file) => formData.append("files", file));
        }

        const stringData = JSON.stringify({
          room,
          message
        });

        formData.append("data", stringData);

        return {
          body: formData,
          url: "message",
          method: "POST",
        };
      },
    }),

    readMessagesInGroup: builder.query<
      unknown,
      { room: string; messageids?: string[] }
    >({
      query: (body) => ({
        url: `/message/read`,
        method: "PATCH",
        body,
      }),
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
  useLazyGetStatsQuery,
  useGetMessagesQuery,
  useLazyReadMessagesInGroupQuery,
  useLazyGetMessagesQuery,
  useCreateMessageMutation,
} = chatApi;
