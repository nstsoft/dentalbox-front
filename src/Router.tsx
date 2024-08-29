import { createBrowserRouter, Outlet } from "react-router-dom";
import { Layout } from "./Layout";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import {
  Dashboard,
  Auth,
  Login,
  SignUp,
  Oauth2,
  HomePage,
  WorkspacePage,
} from "./pages";

export const getRoutes = (isAuthenticated: boolean) => {
  return createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: HomePage },
        {
          path: "/auth",
          Component: Auth,
          children: [
            { path: "/auth/login", Component: Login },
            { path: "/auth/cabinet", Component: SignUp },
            { path: "/auth/oauth2", Component: Oauth2 },
          ],
        },
        {
          path: "/app",
          element: (
            <section>
              {isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />}
            </section>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <WorkspacePage />
                </Suspense>
              ),
            },
            { path: "/app/dashboard", Component: Dashboard },
          ],
        },
      ],
    },
  ]);
};
