import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import classes from "./Navbar.module.scss";

export const Navbar = () => {
  const { t } = useTranslation();
  const navLinks = [
    {
      path: "/auth/login",
      name: t("navbar.signIn"),
      active: "login",
    },
    {
      path: "/auth/cabinet",
      name: t("navbar.createCabinet"),
      active: "cabinet",
    },
  ];

  return (
    <div className={classes["toolbar-wrapper"]}>
      <div className={`container ${classes["toolbar"]}`}>
        <div className="col-md-4 d-none d-md-block d-lg-block d-xl-block">
          <h2 className={classes["logo"]}>Dental Box</h2>
        </div>
        <div className="col-md-8 col-sm-12 d-flex justify-content-end">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              className={classes["login-button"]}
              to={link.path}
            >
              <button>{link.name}</button>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
