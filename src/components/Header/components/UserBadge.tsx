import { type FC, useState } from "react";
import { useAuth } from "@hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const UserBadge: FC = () => {
  const { t } = useTranslation("", { keyPrefix: "header" });
  const { user, isLoggedIn, logout, availableWorkspaces, changeWorkspace } =
    useAuth();
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement>();
  const navigate = useNavigate();

  if (!isLoggedIn || !user) return null;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={(event) => setAnchorElUser(event.currentTarget)}
          sx={{ p: 0 }}
        >
          <Avatar alt={user.name} src={user.image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(undefined)}
      >
        {availableWorkspaces.length > 1 &&
          availableWorkspaces.map((workspace) => (
            <MenuItem key={workspace._id} onClick={() => {}}>
              <IconButton
                onClick={(event) => {
                  setAnchorElUser(event.currentTarget);
                  changeWorkspace(workspace._id);
                }}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={workspace.name}
                  src={workspace.image}
                  sx={{ mr: 1 }}
                />
                <Typography variant="body1">{workspace.name}</Typography>
              </IconButton>
            </MenuItem>
          ))}

        <MenuItem
          key="logout"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <Typography sx={{ textAlign: "center" }}>{t("logout")}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
