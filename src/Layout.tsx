import "./index.scss";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "@components";

import Box from "@mui/material/Box";

export const Layout = () => {
  return (
    <section className="layout">
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </section>
  );
};
