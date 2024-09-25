import { type FC, useState } from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";
import { PAGES } from "@utils";
import { useTranslation } from "react-i18next";
import { OPENED_MENU_WIDTH, CLOSED_MENU_WIDTH } from "@utils";
import { isMobile, isTablet } from "react-device-detect";
import { useSideMenu } from "@hooks";

const isMenuMobile = isMobile || isTablet;

type Pages = (typeof PAGES)[number];

const icons: { [key in Pages]: JSX.Element } = {
  workspace: <WorkspacesIcon />,
  patients: <GroupIcon />,
  cabinets: <AddLocationAltIcon />,
  calendar: <CalendarMonthIcon />,
  staff: <GroupIcon />,
  profile: <SettingsIcon />,
};

const getDrawerStyle = (isOpen: boolean) =>
  isMenuMobile
    ? {}
    : {
        transition: "width 0.3s",
        "& .MuiDrawer-paper": {
          width: isOpen ? OPENED_MENU_WIDTH : CLOSED_MENU_WIDTH,
          paddingTop: "64px",
          overflowX: "hidden",
          transition: "width 0.3s",
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
        },
      };

import ForumIcon from "@mui/icons-material/Forum";
export const SideMenu: FC = () => {
  const { isOpenMenu, setIsOpen, toggle } = useSideMenu();
  const { t } = useTranslation("", { keyPrefix: "sideMenu" });

  const [page, setPage] = useState<(typeof PAGES)[number]>(
    PAGES.find((page) => page === location.pathname.split("/")[2]) ??
      "workspace"
  );

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen);
  };

  const navigate = useNavigate();

  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation">
      <List>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: isOpenMenu ? "flex-end" : "flex-start",
          }}
          onClick={toggle}
        >
          {isOpenMenu ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </ListItem>
        {PAGES.map((text) => (
          <ListItem
            key={text}
            disablePadding
            className={page === text ? "Mui-selected" : ""}
            onClick={() => {
              setPage(text);
              navigate(`${text}`);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{icons[text]}</ListItemIcon>
              <ListItemText primary={t(`pages.${text}`)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["chat"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", position: "fixed", top: 0, height: "100%" }}>
      <SwipeableDrawer
        onOpen={toggleDrawer(true)}
        sx={getDrawerStyle(isOpenMenu)}
        variant={isMenuMobile ? "temporary" : "permanent"}
        open={isOpenMenu}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </SwipeableDrawer>
    </Box>
  );
};
