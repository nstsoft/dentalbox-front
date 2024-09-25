import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  UserBadge,
  RightToolbar,
  LanguageSelector,
  WorkspaceBadge,
  AuthButtons,
} from "./components";
import { type FC } from "react";
import { useSideMenu, useAuth } from "@hooks";
import { isMobile, isTablet } from "react-device-detect";

const sx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  overflow: "hidden",
  pr: 1,
  pl: 1,
  zIndex: 2,
};

export const Header: FC = () => {
  const { toggle } = useSideMenu();
  const { isLoggedIn } = useAuth();
  return (
    <Box>
      <AppBar position="relative" sx={sx}>
        {(isMobile || isTablet) && isLoggedIn && (
          <IconButton color="inherit" onClick={toggle}>
            <MenuIcon />
          </IconButton>
        )}
        <Toolbar sx={{ p: 0 }}>
          <WorkspaceBadge />
        </Toolbar>
        <Toolbar sx={{ p: 0 }}>
          <RightToolbar mailContentCount={10} />
          <UserBadge />
          <AuthButtons />
          <LanguageSelector />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
