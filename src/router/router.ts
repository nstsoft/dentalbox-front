import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/auth",
        lazy: async () => {
          const { Auth } = await import("../pages/Auth/Auth");
          return { Component: Auth };
        },
        children: [
          {
            path: "/auth/login",
            lazy: async () => {
              const { Login } = await import("../pages/Auth/Login");
              return { Component: Login };
            },
          },
          {
            path: "/auth/cabinet",
            lazy: async () => {
              const { SignUp } = await import("../pages/Auth/SignUp");
              return { Component: SignUp };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
