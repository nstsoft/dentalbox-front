import { NavLink, useLocation } from "react-router-dom";

import classes from "./Navbar.module.scss";

export const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    {
      path: "/auth/login",
      name: "Sign In",
      active: "login",
    },
    {
      path: "/auth/cabinet",
      name: "Create Cabinet",
      active: "cabinet",
    },
  ];

  return (
    <div className={classes["toolbar-wrapper"]}>
      <div className={`container ${classes["toolbar"]}`}>
        <div className="col-md-8 col-sm-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              className={`${classes["login-button"]} ${
                location.pathname.includes(link.active) &&
                classes["active-nav-link"]
              }`}
              to={link.path}
            >
              <button>{link.name}</button>
            </NavLink>
          ))}
        </div>
        <div className="col-md-4 d-none d-md-block d-lg-block d-xl-block">
          <h2 className={classes["logo"]}>Dental Box</h2>
        </div>
      </div>
    </div>
  );
};
