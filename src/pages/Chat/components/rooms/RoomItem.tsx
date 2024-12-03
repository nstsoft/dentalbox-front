import type { Room } from "@types";
import { Fragment, useState, type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { generateColor } from "../../utils";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "../../chat.scss";

type Props = {
  room: Room;
  onSelect: (id: string) => void;
  selected: boolean;
};

export const RoomItem: FC<Props> = ({ room, onSelect, selected }) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setContextMenu(
      (e.target as HTMLElement).classList.contains("room-item")
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Box
      className={`room-item ${selected && "selected"}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains("room-item")) {
          onSelect(room.id);
        }
      }}
      onContextMenu={handleContextMenu}
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
                overlap="circular"
                variant="dot"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
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
            )}
          </Fragment>
        ))}
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={() => console.log(`Edit ${room.name}`)}>
            Edit
          </MenuItem>
          <MenuItem onClick={() => console.log(`Delete ${room.name}`)}>
            Delete
          </MenuItem>
        </Menu>
      </Box>

      <Box className="room-item-name">
        <Typography variant="h6">{room.name}</Typography>
      </Box>
    </Box>
  );
};
