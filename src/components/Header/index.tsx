import { AppBar, Box, Toolbar } from "@mui/material";

import {
  UserBadge,
  RightToolbar,
  LanguageSelector,
  WorkspaceBadge,
  AuthButtons,
} from "./components";
import { type FC } from "react";

const style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  overflow: "hidden",
};

export const Header: FC = () => {
  return (
    <Box>
      <AppBar sx={style} position="static">
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
