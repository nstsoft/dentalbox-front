import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./auth.scss";

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/auth") {
      navigate("/auth/login");
    }
  }, [location]);

  return (
    <div className="auth">
      <main className="auth__main">
        <Outlet />
      </main>
    </div>
  );
};
