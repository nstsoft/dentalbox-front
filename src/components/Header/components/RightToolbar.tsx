import { type FC } from "react";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "@hooks";
import { isMobile } from "react-device-detect";

type ToolBar = {
  mailContentCount?: number;
  notificationsContentCount?: number;
};

export const RightToolbar: FC<ToolBar> = ({
  mailContentCount,
  notificationsContentCount,
}) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return (
    <Toolbar
      variant="dense"
      sx={{ pl: isMobile ? 1 : 2, pr: isMobile ? 0 : 2 }}
    >
      <IconButton
        onClick={() => {}}
        size={isMobile ? "medium" : "large"}
        aria-label="show 4 new mails"
        color="inherit"
      >
        <Badge badgeContent={mailContentCount ?? 0} color="error">
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
