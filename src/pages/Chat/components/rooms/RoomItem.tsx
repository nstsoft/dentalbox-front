import type { Room } from "@types";
import { Fragment, type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { generateColor } from "../../utils";
import Badge from "@mui/material/Badge";

import "../../chat.scss";

type Props = {
  room: Room;
  onSelect: (id: string) => void;
  selected: boolean;
};

export const RoomItem: FC<Props> = ({ room, onSelect, selected }) => {
  return (
    <Box
      className={`room-item ${selected && "selected"}`}
      onClick={() => {
        onSelect(room.id);
      }}
    >
      <Box
        sx={{
          width: "40px",
          height: "40px",
          display: "flex",
          flexFlow: "row wrap",
          position: "relative",
          borderRadius: "50%",
        }}
      >
        {room.users.map((user) => (
          <Fragment key={user._id}>
            {room.users.length > 1 ? (
              <>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    background: user.image
                      ? `url(${user.image})`
                      : generateColor(room.id),
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    color: "#fff",
                  }}
                >
                  {user.image ? "" : user.name[0]}
                </Box>
              </>
            ) : (
              <Badge
                color={user.online ? "secondary" : "default"}
                overlap="circular"
                variant="dot"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
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
            )}
          </Fragment>
        ))}
      </Box>

      <Box className="room-item-name">
        <Typography variant="h6">{room.name}</Typography>
      </Box>
    </Box>
  );
};
