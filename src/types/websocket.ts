/* eslint-disable @typescript-eslint/no-explicit-any */
export enum WS_EVENTS {
  ROOM_CREATED = "ROOM_CREATED",
  ROOM_UPDATED = "ROOM_UPDATED",
  checkin_completed = "checkin-completed",
}

export enum WS_ACTIONS {
  checkin = "checkin",
}

export type SocketMessage<T = { [key: string]: any }> = {
  action: WS_EVENTS;
  data: T;
};
