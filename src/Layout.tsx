import "./index.scss";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <section className="layout">
      <Outlet />
    </section>
  );
};
