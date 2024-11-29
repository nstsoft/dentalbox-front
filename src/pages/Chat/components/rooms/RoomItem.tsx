import type { Room } from "@types";
import { type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

type Props = { room: Room; onSelect: (id: string) => void };

export const RoomItem: FC<Props> = ({ room }) => {
  return (
    <Box className="room-item">
      <AvatarGroup spacing={1} total={room.users.length}>
        {room.users.map((user) => (
          <Avatar key={user._id} alt={user.name} src={user.image} />
        ))}
      </AvatarGroup>
      <Box>
        <Typography variant="h6">{room.name}</Typography>
      </Box>
    </Box>
  );
};
