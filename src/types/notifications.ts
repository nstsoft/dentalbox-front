import { Message } from "./message";

export type Stats = {
  [key: string]: { count: number; last: string };
};

export interface NotificationsContextType {
  roomNotifications: Stats | null;
  unreadRooms: number;
  receiveMessage: (message: Message) => void;
  getStats: () => void;
  readRoom: (room: string) => void;
}
