import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import "./Auth.scss";

export const Auth = () => {
  return (
    <div className="auth">
      <Navbar />

      <main className="auth__main">
        <Outlet />
      </main>
    </div>
  );
};
