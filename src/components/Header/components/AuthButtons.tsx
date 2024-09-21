import { type FC, useState } from "react";

import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAuth } from "@hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LoginIcon from "@mui/icons-material/Login";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export const AuthButtons: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation("", { keyPrefix: "buttons" });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoggedIn) return null;

  return (
    <Box>
      <Button color="inherit" onClick={handleClick}>
        <PersonPinIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/auth/login");
          }}
        >
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("login")}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/auth/sign-up");
          }}
        >
          <ListItemIcon>
            <PersonAddAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText> {t("signUp")}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
