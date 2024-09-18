import { useAuth } from "@hooks";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import {
  UserBadge,
  RightToolbar,
  LanguageSelector,
  WorkspaceBadge,
} from "./components";
import { type FC } from "react";
import { PAGES } from "@utils";

type Props = {
  setIsOpenMenu: (open: boolean) => void;
  currentPage: (typeof PAGES)[number];
};

export const Header: FC<Props> = ({ setIsOpenMenu }) => {
  const { user, workspace, isLoggedIn } = useAuth();
  console.log({ user, workspace });
  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "header" });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setIsOpenMenu(true)}
              >
                <MenuIcon />
              </IconButton>
              <WorkspaceBadge />
            </>
          )}

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
