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

  const receiveMessage = useCallback(
    (message: Message) => {
      if (message.id === lastMessageId) return;
      setLastMessageId(message.id);
      setUnreadRooms((prev) => prev + 1);
      setRoomNotifications((prev) => ({
        ...prev,
        [message.room]: {
          count: (prev?.[message.room].count ?? 0) + 1,
          last: message.message,
        },
      }));
    },
    [lastMessageId]
  );

  return (
    <NotificationsContext.Provider
      value={{ roomNotifications, unreadRooms, receiveMessage, getStats }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
