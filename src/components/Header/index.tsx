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
import { UserBadge, RightToolbar, LanguageSelector } from "./components";

export function Header() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "header" });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Workspace
          </Typography>
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
}
