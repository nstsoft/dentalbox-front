import "./index.scss";
import { Outlet } from "react-router-dom";
import { Navbar } from "@components";
export const Layout = () => {
  return (
    <section className="layout">
      <Navbar />
      <Outlet />
    </section>
  );
};
