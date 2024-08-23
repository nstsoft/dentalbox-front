import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/auth",
        lazy: () => import("./pages").then(({ Auth }) => ({ Component: Auth })),
        children: [
          {
            path: "/auth/login",
            lazy: () =>
              import("./pages").then(({ Login }) => ({ Component: Login })),
          },
          {
            path: "/auth/cabinet",
            lazy: () =>
              import("./pages").then(({ SignUp }) => ({ Component: SignUp })),
          },
          {
            path: "/auth/oauth2",
            lazy: () =>
              import("./pages").then(({ Oauth2 }) => ({ Component: Oauth2 })),
          },
        ],
      },
    ],
  },
]);

export default router;
