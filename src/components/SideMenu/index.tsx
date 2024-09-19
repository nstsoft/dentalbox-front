import { type FC, type Dispatch, type SetStateAction, useState } from "react";

import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  SwipeableDrawer,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { PAGES } from "@utils";
import { useTranslation } from "react-i18next";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { OPENED_MENU_WIDTH, CLOSED_MENU_WIDTH } from "@utils";

type Pages = (typeof PAGES)[number];

const icons: { [key in Pages]: JSX.Element } = {
  workspace: <WorkspacesIcon />,
  patients: <GroupIcon />,
  cabinets: <AddLocationAltIcon />,
  calendar: <CalendarMonthIcon />,
  staff: <GroupIcon />,
  profile: <SettingsIcon />,
};

import ForumIcon from "@mui/icons-material/Forum";
export const SideMenu: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
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
            justifyContent: isOpen ? "flex-end" : "flex-start",
          }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
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
              <ListItemIcon
              // sx={{
              //   color: page === text ? "#4393bb" : "rgba(0, 0, 0, 0.54)",
              // }}
              >
                {icons[text]}
              </ListItemIcon>
              <ListItemText
                // sx={{
                //   color: page === text ? "#4393bb" : "rgba(0, 0, 0, 0.54)",
                // }}
                primary={t(`pages.${text}`)}
              />
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
    <Box sx={{ display: "flex" }}>
      <SwipeableDrawer
        onOpen={toggleDrawer(true)}
        sx={{
          width: isOpen ? OPENED_MENU_WIDTH : CLOSED_MENU_WIDTH,
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: isOpen ? OPENED_MENU_WIDTH : CLOSED_MENU_WIDTH,
            marginTop: "64px",
            overflowX: "hidden",
            transition: "width 0.3s",
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
          },
        }}
        variant="permanent"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </SwipeableDrawer>
    </Box>
  );
};
