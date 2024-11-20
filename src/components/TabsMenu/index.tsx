import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { type FC, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
  tabs: {
    label: string;
    index: number;
  }[];
  setCurrentTab: (index: number) => void;
};

export const TabsMenu: FC<Props> = ({ setCurrentTab, tabs }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        color="inherit"
        onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
        sx={{ minWidth: "40px" }}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="tabs-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "tabs-menu-button",
        }}
      >
        {tabs.map((tab, index) => (
          <MenuItem
            key={`${tab.index}-${index}`}
            onClick={() => {
              setAnchorEl(null);
              setCurrentTab(tab.index);
            }}
          >
            <ListItemText>{tab.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
