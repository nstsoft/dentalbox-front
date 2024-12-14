import type { Room, UserSummaryListItem } from "@types";
import { Fragment, type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { generateColor } from "../../utils";
import Badge from "@mui/material/Badge";
import { IconButton } from "@elements";
import { useNotifications } from "@hooks";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "../../chat.scss";

type Props = {
  room: Room;
  setSelectedRoom: (room?: Room) => void;
  selected: boolean;
  openMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const RoomItem: FC<Props> = ({
  room,
  setSelectedRoom,
  selected,
  openMenu,
}) => {
  const { roomNotifications } = useNotifications();

  const renderAvatar = (user: UserSummaryListItem & { online: boolean }) => (
    <Badge
      overlap="circular"
      variant="dot"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: user.online ? "green" : "gray",
        },
      }}
    >
      <Avatar
        alt={user.name}
        src={user.image}
        sx={{ background: generateColor(room.id) }}
      >
        {user.name[0]}
      </Avatar>
    </Badge>
  );

  const renderAvatarGroup = (
    user: UserSummaryListItem & { online: boolean }
  ) => (
    <Box
      className="avatar-group"
      sx={{
        background: user.image ? `url(${user.image})` : generateColor(room.id),
      }}
    >
      {user.image ? "" : user.name[0]}
    </Box>
  );

  return (
    <Box
      className={`room-item ${selected ? "selected" : ""}`}
      onClick={() => setSelectedRoom(room)}
    >
      <Box className="room-item__avatar">
        {room.users.map((user) => (
          <Fragment key={user._id}>
            {room.users.length > 1
              ? renderAvatarGroup(user)
              : renderAvatar(user)}
          </Fragment>
        ))}
      </Box>

      <Box className="room-item-message">
        <Typography className="name" variant="h6">
          {room.name}
        </Typography>
        {roomNotifications?.[room.id] && (
          <Typography className="last-message" variant="body2">
            {roomNotifications?.[room.id]?.last}
          </Typography>
        )}
      </Box>
      <Box className="room-item__actions">
        <Badge
          badgeContent={roomNotifications?.[room.id]?.count ?? 0}
          color="error"
        />
        <IconButton className="icon-button" onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
