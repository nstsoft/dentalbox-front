import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Navigate } from "react-router-dom";

import {
  Auth,
  Login,
  SignUp,
  Oauth2,
  HomePage,
  WorkspacePage,
  CheckoutPage,
  StuffPage,
  PatientsPage,
  CabinetPage,
  CalendarPage,
  ProfilePage,
  ProtectedApp,
  AcceptInvitation,
  PatientCardPage,
  ChatPage,
  ResetPassword,
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
            { path: "/auth/accept-invitation", Component: AcceptInvitation },
          ],
        },
        {
          path: "/reset-password",
          Component: ResetPassword,
        },
        {
          path: "/app",
          element: <ProtectedApp isAuthenticated={isAuthenticated} />,
          children: [
            {
              index: true,
              element: <Navigate to="/app/workspace" />,
            },
            { path: "/app/checkout", Component: CheckoutPage },
            { path: "/app/workspace", Component: WorkspacePage },
            { path: "/app/stuff", Component: StuffPage },
            { path: "/app/patients", Component: PatientsPage },
            { path: "/app/patients/:patientId", Component: PatientCardPage },
            { path: "/app/cabinets", Component: CabinetPage },
            { path: "/app/calendar", Component: CalendarPage },
            { path: "/app/profile", Component: ProfilePage },
            { path: "/app/chat", Component: ChatPage },
          ],
        },
      ],
    },
  ]);
};
