import { createApi } from "@reduxjs/toolkit/query/react";
import { MESSAGE_TAG, REDUCER } from "../constants";
import { chatBaseQuery } from "./baseQuery";
import type { Message } from "@types";

export const messageApi = createApi({
    reducerPath: REDUCER.MESSAGE,
    tagTypes: Object.values(MESSAGE_TAG),
    baseQuery: chatBaseQuery,
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], string>({
            query: (roomId) => ({ url: `/message/${roomId}` }),
            providesTags: () => [{ type: MESSAGE_TAG.MESSAGES }],
        }),
    }),
})

export const {
    useGetMessagesQuery
} = messageApi;
