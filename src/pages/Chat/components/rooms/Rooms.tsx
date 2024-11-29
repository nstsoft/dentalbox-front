import { FC, useEffect, useState, useCallback } from "react";
import {
  useGetRoomsQuery,
  useGetUserSummaryQuery,
  useLazyGetConnectionsQuery,
} from "@api";
import { useAuth } from "@hooks";
import { RoomItem } from "./RoomItem";
import { useWebsocket } from "@hooks";
import { WS_EVENTS, RoomResponse, Room, UserSummaryListItem } from "@types";

export const Rooms: FC = () => {
  const { data: rooms } = useGetRoomsQuery();
  const { data: usersSummary } = useGetUserSummaryQuery();
  const [fetchConnections, { data: connections, isSuccess }] =
    useLazyGetConnectionsQuery();
  const { message, checkedIn } = useWebsocket();
  const { user } = useAuth();
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const parseRoom = useCallback(
    (room: RoomResponse): Room => {
      const parsedUsers = room.userids
        .filter((id) => id !== user?._id)
        .map((id) => ({
          ...(usersSummary?.find(
            (user) => user._id === id
          ) as UserSummaryListItem),
          online: onlineUsers.includes(id),
        }));

      return { ...room, users: parsedUsers };
    },
    [onlineUsers, user?._id, usersSummary]
  );

  useEffect(() => {
    if (checkedIn) {
      fetchConnections();
    }
  }, [checkedIn, fetchConnections]);

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
    if (
      rooms?.length &&
      usersSummary?.length &&
      user?._id &&
      onlineUsers?.length
    ) {
      const roomsList = rooms.map((room) => parseRoom(room));
      setRoomsList(roomsList);
    }
  }, [onlineUsers?.length, parseRoom, rooms, user?._id, usersSummary?.length]);

  if (!rooms?.length || !usersSummary?.length || !user) {
    return null;
  }

  return (
    <div>
      {roomsList.map((room) => (
        <RoomItem key={room.id} room={room} onSelect={() => {}} />
      ))}
    </div>
  );
};
