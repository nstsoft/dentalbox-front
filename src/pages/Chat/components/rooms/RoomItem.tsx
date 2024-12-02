import type { Room } from "@types";
import { type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { StyledBadge } from "./Badge";

import "../../chat.scss";

type Props = {
  room: Room;
  onSelect: (id: string) => void;
  selected: boolean;
  onlineUsers: string[];
};

export const RoomItem: FC<Props> = ({
  room,
  onSelect,
  selected,
  onlineUsers,
}) => {
  return (
    <Box
      className={`room-item ${selected && "selected"}`}
      onClick={() => {
        onSelect(room.id);
      }}
    >
      <AvatarGroup spacing={1} total={room.users.length}>
        {room.users.map((user) => (
          <StyledBadge
            isOnline={onlineUsers.includes(user._id)}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar key={user._id} alt={user.name} src={user.image} />
          </StyledBadge>
        ))}
      </AvatarGroup>
      <Box className="room-item-name">
        <Typography variant="h6">{room.name}</Typography>
      </Box>
    </Box>
  );
};
