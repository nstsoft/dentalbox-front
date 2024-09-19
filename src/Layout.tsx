import "./index.scss";
import { Outlet } from "react-router-dom";
import { Header, SideMenu } from "@components";
import { useState } from "react";
import { PAGES } from "@utils";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const drawerWidthOpen = 200;
const drawerWidthClosed = 56;

export const Layout = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState<(typeof PAGES)[number]>(
    PAGES.find((page) => page === location.pathname.split("/")[2]) ??
      "workspace"
  );

  return (
    <section className="layout">
      <Header setIsOpenMenu={setIsOpenMenu} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isOpenMenu
            ? `${drawerWidthOpen}px`
            : `${drawerWidthClosed}px`,
          transition: "margin-left 0.3s",
        }}
      >
        <Outlet />
      </Box>
    </section>
  );
};
