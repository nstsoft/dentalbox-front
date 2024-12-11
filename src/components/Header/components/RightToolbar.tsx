import { type FC } from "react";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth, useNotifications } from "@hooks";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

type ToolBar = {
  notificationsContentCount?: number;
};

export const RightToolbar: FC<ToolBar> = ({ notificationsContentCount }) => {
  const { unreadRooms } = useNotifications();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return null;

  return (
    <Toolbar
      variant="dense"
      sx={{ pl: isMobile ? 1 : 2, pr: isMobile ? 0 : 2 }}
    >
      <IconButton
        onClick={() => navigate("/app/chat")}
        size={isMobile ? "medium" : "large"}
        aria-label="show 4 new mails"
        color="inherit"
      >
        <Badge badgeContent={unreadRooms ?? 0} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
        size={isMobile ? "medium" : "large"}
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={() => {}}
      >
        <Badge badgeContent={notificationsContentCount ?? 0} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  );
};
