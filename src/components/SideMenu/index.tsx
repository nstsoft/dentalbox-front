import { type FC } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { PAGES } from "@utils";
import { useTranslation } from "react-i18next";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";

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
  setIsOpen: (isOpen: boolean) => void;
  setPage: (page: (typeof PAGES)[number]) => void;
}> = ({ isOpen, setIsOpen, setPage }) => {
  const { t } = useTranslation("", { keyPrefix: "sideMenu" });
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen);
  };
  const navigate = useNavigate();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {PAGES.map((text) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              setPage(text);
              navigate(`app/${text}`);
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
    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};
