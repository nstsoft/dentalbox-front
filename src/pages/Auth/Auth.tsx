import "./auth.scss";
import { Outlet } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <main className="auth__main">
        <Outlet />
      </main>
    </div>
  );
};
