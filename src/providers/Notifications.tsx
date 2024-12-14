import {
  useState,
  useCallback,
  useEffect,
  type FC,
  type ReactElement,
} from "react";
import { NotificationsContext } from "./context";
import { useLazyGetStatsQuery } from "@api";
import { Message, Stats } from "@types";

export const NotificationsProvider: FC<{
  children: ReactElement | ReactElement[];
}> = ({ children }) => {
  const [getStats, { data, isSuccess }] = useLazyGetStatsQuery();
  const [unreadRooms, setUnreadRooms] = useState(0);
  const [roomNotifications, setRoomNotifications] = useState<Stats | null>(
    null
  );
  const [lastMessageId, setLastMessageId] = useState<string>();

  useEffect(() => {
    if (isSuccess) {
      setUnreadRooms(Object.keys(data).length);
      setRoomNotifications(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    setUnreadRooms(Object.keys(roomNotifications ?? {}).length);
  }, [roomNotifications]);

  const receiveMessage = useCallback(
    (message: Message) => {
      const userId = JSON.parse(localStorage.getItem("user") ?? "{}")._id;

      if (message.id === lastMessageId || message.author === userId) return;

      setLastMessageId(message.id);
      setRoomNotifications((prev) => ({
        ...prev,
        [message.room]: {
          count: (prev?.[message.room]?.count ?? 0) + 1,
          last: message.message,
        },
      }));
    },
    [lastMessageId]
  );

  const readRoom = useCallback((room: string) => {
    setRoomNotifications(
      (prev) =>
        prev &&
        Object.fromEntries(Object.entries(prev).filter(([key]) => key !== room))
    );
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        roomNotifications,
        readRoom,
        unreadRooms,
        receiveMessage,
        getStats,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
