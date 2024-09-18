import "./index.scss";
import { Outlet } from "react-router-dom";
import { Header, SideMenu } from "@components";
import { useState } from "react";
import { PAGES } from "@utils";
import { useLocation } from "react-router-dom";

export const Layout = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState<(typeof PAGES)[number]>(
    PAGES.find((page) => page === location.pathname.split("/")[2]) ??
      "workspace"
  );

  return (
    <section className="layout">
      <Header currentPage={page} setIsOpenMenu={setIsOpenMenu} />
      <SideMenu
        setPage={setPage}
        setIsOpen={setIsOpenMenu}
        isOpen={isOpenMenu}
      />
      <Outlet />
    </section>
  );
};
