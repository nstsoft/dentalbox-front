import { FC, useEffect, useState, useCallback } from "react";
import {
  useGetRoomsQuery,
  useGetUserSummaryQuery,
  useGetConnectionsQuery,
} from "@api";
import { useAuth, useNotifications } from "@hooks";
import { RoomItem } from "./RoomItem";
import { useWebsocket } from "@hooks";
import { WS_EVENTS, RoomResponse, Room, UserSummaryListItem } from "@types";
import { ActionsMenu } from "./Menu";
type UsersMap = { [key: string]: UserSummaryListItem & { online: boolean } };

type Props = {
  selectedRoom?: Room;
  setSelectedRoom: (room?: Room) => void;
};

export const Rooms: FC<Props> = ({ selectedRoom, setSelectedRoom }) => {
  const { data: rooms } = useGetRoomsQuery();
  const { data: usersSummary } = useGetUserSummaryQuery();
  const { data: connections, isSuccess } = useGetConnectionsQuery();
  const { message } = useWebsocket();
  const { user } = useAuth();
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [usersMap, setUsersMap] = useState<UsersMap>();
  const [menu, setMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const notifications = useNotifications();

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };

  const handleClose = () => {
    setMenu(null);
  };

  useEffect(() => {
    if (usersSummary?.length) {
      const users: UsersMap = usersSummary.reduce(
        (acc, el) => ({ ...acc, [el._id]: { ...el, online: false } }),
        {}
      );
      onlineUsers?.forEach((user) => (users[user].online = true));
      setUsersMap(users);
    }
  }, [usersSummary, onlineUsers]);

  const parseRoom = useCallback(
    (room: RoomResponse): Room => {
      const users = room.userids
        .filter((id) => id !== user?._id)
        .map((id) => usersMap?.[id])
        .filter((el) => !!el);

      return { ...room, users: users ?? [] };
    },
    [user?._id, usersMap]
  );

  useEffect(() => {
    if (connections?.length && isSuccess) {
      setOnlineUsers([...new Set(connections.map((c) => c.userid))]);
    }
  }, [connections, isSuccess]);

  useEffect(() => {
    if (message?.action === WS_EVENTS.USER_ONLINE) {
      setOnlineUsers((prev) => [
        ...new Set([...prev, message.data.userid as string]),
      ]);
    }
    if (message?.action === WS_EVENTS.USER_OFFLINE) {
      setOnlineUsers((prev) => prev.filter((id) => id !== message.data.userid));
    }
  }, [message]);

  useEffect(() => {
    if (message && message.action === WS_EVENTS.ROOM_CREATED) {
      const data = message.data as RoomResponse;
      console.log("Room created:", message.data);
      const newRoom = parseRoom(data);
      setRoomsList((roomsList) => [...roomsList, newRoom]);
    }
  }, [message, parseRoom]);

  useEffect(() => {
    if (rooms?.length && usersSummary?.length && user?._id) {
      const roomsList = rooms.map((room) => parseRoom(room));
      setRoomsList(roomsList);
    }
  }, [parseRoom, rooms, user?._id, usersSummary?.length]);

  if (!rooms?.length || !usersSummary?.length || !user) {
    return null;
  }

  return (
    <div>
      {roomsList.map((room) => (
        <RoomItem
          key={room.id}
          room={room}
          selected={room.id === selectedRoom?.id}
          setSelectedRoom={setSelectedRoom}
          openMenu={openMenu}
        />
      ))}
      {selectedRoom && (
        <ActionsMenu
          room={selectedRoom}
          open={!!menu}
          onClose={handleClose}
          anchorPosition={{ top: menu?.mouseY ?? 0, left: menu?.mouseX ?? 0 }}
        />
      )}
    </div>
  );
};
