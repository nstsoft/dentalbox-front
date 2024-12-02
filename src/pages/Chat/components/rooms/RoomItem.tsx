import type { Room } from "@types";
import { type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import "../../chat.scss";

type Props = { room: Room; onSelect: (id: string) => void; selected: boolean };

export const RoomItem: FC<Props> = ({ room, onSelect, selected }) => {
  return (
    <Box
      className={`room-item ${selected && "selected"}`}
      onClick={() => {
        onSelect(room.id);
      }}
    >
      <AvatarGroup spacing={1} total={room.users.length}>
        {room.users.map((user) => (
          <Avatar key={user._id} alt={user.name} src={user.image} />
        ))}
      </AvatarGroup>
      <Box className="room-item-name">
        <Typography variant="h6">{room.name}</Typography>
      </Box>
    </Box>
  );
};
