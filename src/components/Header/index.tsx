import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  UserBadge,
  RightToolbar,
  LanguageSelector,
  WorkspaceBadge,
  AuthButtons,
} from "./components";
import { type FC } from "react";

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
  return (
    <Box>
      <AppBar position="relative" sx={sx}>
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
