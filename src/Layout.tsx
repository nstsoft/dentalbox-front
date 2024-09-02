import "./index.scss";
import { Outlet } from "react-router-dom";
import { Header } from "@components";
export const Layout = () => {
  return (
    <section className="layout">
      <Header />
      <Outlet />
    </section>
  );
};
