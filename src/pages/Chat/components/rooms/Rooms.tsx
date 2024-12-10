import { type FC, useEffect, useState, useCallback } from "react";
import {
  useGetRoomsQuery,
  useGetUserSummaryQuery,
  useGetConnectionsQuery,
  useCreateRoomMutation,
} from "@api";
import { useAuth, useNotifications } from "@hooks";
import { RoomItem } from "./RoomItem";
import { useWebsocket } from "@hooks";
import { WS_EVENTS, RoomResponse, Room } from "@types";
import { ActionsMenu } from "./Menu";
import { UsersMap } from "../../types";
import { UsersFilter } from "./UsersFilter";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ChatDrawer } from "../drawer";
import { useTranslation } from "react-i18next";

type Props = {
  selectedRoom?: Room;
  setSelectedRoom: (room?: Room) => void;
};

export const Rooms: FC<Props> = ({ selectedRoom, setSelectedRoom }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [createRoom] = useCreateRoomMutation();

  const usersList =
    usersSummary?.filter((u) => !u.deleted && user?._id !== u._id) ?? [];

  const usersToAdd = usersList.filter((u) =>
    roomsList.every((room) => !room?.users.some((r) => r._id === u._id))
  );

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
      const newRoom = parseRoom(data);
      setRoomsList((roomsList) => [newRoom, ...roomsList]);
    }
    if (message && message.action === WS_EVENTS.ROOM_REMOVED) {
      const data = message.data as RoomResponse;
      setRoomsList((roomsList) => roomsList.filter((r) => r.id !== data.id));
    }
  }, [message, parseRoom]);

  useEffect(() => {
    if (rooms?.length && usersSummary?.length && user?._id) {
      const roomsList = rooms.map((room) => parseRoom(room));
      setRoomsList(roomsList);
    }
  }, [parseRoom, rooms, user?._id, usersSummary?.length]);

  return (
    <>
      <Button
        disabled={usersToAdd.length === 0}
        className="new-chat-button"
        onClick={() => setIsDrawerOpen(true)}
      >
        <AddCircleOutlineIcon />
        <Typography variant="h6">{t("newChat")}</Typography>
      </Button>
      <UsersFilter availableUsers={usersToAdd} />
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
            usersList={usersList}
          />
        )}
      </div>
      <ChatDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        users={usersToAdd}
        onSubmit={(newRoom) => createRoom(newRoom)}
      />
    </>
  );
};
