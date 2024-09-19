import { useAuth } from "@hooks";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  UserBadge,
  RightToolbar,
  LanguageSelector,
  WorkspaceBadge,
} from "./components";
import { type FC } from "react";

export const Header: FC = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "header" });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn && <WorkspaceBadge />}
          {!isLoggedIn && (
            <>
              {" "}
              <Button onClick={() => navigate("/auth/login")} color="inherit">
                {t("login", { keyPrefix: "buttons" })}
              </Button>
              <Button onClick={() => navigate("/auth/sign-up")} color="inherit">
                {t("signUp", { keyPrefix: "buttons" })}
              </Button>
            </>
          )}
          <RightToolbar mailContentCount={10} />
          <UserBadge />
          <LanguageSelector />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
