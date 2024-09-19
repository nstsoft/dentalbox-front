import "./index.scss";
import { Outlet } from "react-router-dom";
import { Header } from "@components";

import { Box } from "@mui/material";

export const Layout = () => {
  return (
    <section className="layout">
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
    </section>
  );
};
