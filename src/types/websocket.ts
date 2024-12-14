/* eslint-disable @typescript-eslint/no-explicit-any */
export enum WS_EVENTS {
  ROOM_CREATED = "ROOM_CREATED",
  ROOM_UPDATED = "ROOM_UPDATED",
  ROOM_REMOVED = "ROOM_REMOVED",
  USER_ONLINE = "USER_ONLINE",
  USER_OFFLINE = "USER_OFFLINE",
  NEW_MESSAGE = "NEW_MESSAGE",
}

import { Message } from "./message";

export type SocketMessage<T = { [key: string]: any }> =
  | { action: WS_EVENTS.NEW_MESSAGE; data: Message }
  | { action: WS_EVENTS; data: T };
