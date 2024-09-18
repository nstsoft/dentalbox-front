import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import {
  Auth,
  Login,
  SignUp,
  Oauth2,
  HomePage,
  WorkspacePage,
  CheckoutPage,
  StaffPage,
  PatientsPage,
  CabinetPage,
  CalendarPage,
  ProfilePage,
  ProtectedApp,
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
            { path: "/auth/sign-up", Component: SignUp },
            { path: "/auth/oauth2", Component: Oauth2 },
          ],
        },
        {
          path: "/app",
          element: <ProtectedApp isAuthenticated={isAuthenticated} />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Navigate to="/app/workspace" />
                </Suspense>
              ),
            },
            { path: "/app/checkout", Component: CheckoutPage },
            { path: "/app/workspace", Component: WorkspacePage },
            { path: "/app/staff", Component: StaffPage },
            { path: "/app/patients", Component: PatientsPage },
            { path: "/app/cabinets", Component: CabinetPage },
            { path: "/app/calendar", Component: CalendarPage },
            { path: "/app/profile", Component: ProfilePage },
          ],
        },
      ],
    },
  ]);
};
