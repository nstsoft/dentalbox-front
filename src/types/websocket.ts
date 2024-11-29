/* eslint-disable @typescript-eslint/no-explicit-any */
export enum WS_EVENTS {
  ROOM_CREATED = "ROOM_CREATED",
  ROOM_UPDATED = "ROOM_UPDATED",
  checkin_completed = "checkin-completed",
  USER_ONLINE = "USER_ONLINE",
  USER_OFFLINE = "USER_OFFLINE",
}

export enum WS_ACTIONS {
  checkin = "checkin",
}

export type SocketMessage<T = { [key: string]: any }> = {
  action: WS_EVENTS;
  data: T;
};
