/* eslint-disable @typescript-eslint/no-explicit-any */
export enum WS_EVENTS {
  ROOM_CREATED = "ROOM_CREATED",
  ROOM_UPDATED = "ROOM_UPDATED",
  USER_ONLINE = "USER_ONLINE",
  USER_OFFLINE = "USER_OFFLINE",
  NEW_MESSAGE = "NEW_MESSAGE",
}

export type SocketMessage<T = { [key: string]: any }> = {
  action: WS_EVENTS;
  data: T;
};
