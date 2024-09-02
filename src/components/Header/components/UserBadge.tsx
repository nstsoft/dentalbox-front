import { type FC, useState } from "react";
import { useAuth } from "@hooks";
import {
  Box,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  Avatar,
} from "@mui/material";
import { UserRole } from "@types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const getUserMenu = (role?: UserRole) => {
  if (!role) return [];
  const menus = [
    { id: "profile", link: "/app/profile" },
    { id: "dashboard", link: "/app/dashboard" },
  ];
  if (role === UserRole.admin) {
    menus.push({
      id: "workspace",
      link: "/app/workspace",
    });
  }

  return menus;
};

export const UserBadge: FC = () => {
  const { t } = useTranslation("", { keyPrefix: "header" });
  const { user, isLoggedIn, logout } = useAuth();
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
        id="menu-appbar"
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
        {getUserMenu(user.role).map((menu) => (
          <MenuItem key={menu.id} onClick={() => navigate(menu.link)}>
            <Typography sx={{ textAlign: "center" }}>{t(menu.id)}</Typography>
          </MenuItem>
        ))}
        <MenuItem key="logout" onClick={logout}>
          <Typography sx={{ textAlign: "center" }}>{t("logout")}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
