import { AppBar, Box, Toolbar } from "@mui/material";

import {
  UserBadge,
  RightToolbar,
  LanguageSelector,
  WorkspaceBadge,
  AuthButtons,
} from "./components";
import { type FC } from "react";

export const Header: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
        position="static"
      >
        <Toolbar>
          <WorkspaceBadge />
        </Toolbar>
        <Toolbar>
          <RightToolbar mailContentCount={10} />
          <UserBadge />
          <AuthButtons />
          <LanguageSelector />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
