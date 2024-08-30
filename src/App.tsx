import { RouterProvider } from "react-router-dom";
import "./i18n";

import { getRoutes } from "./Router";
import { useAuth } from "@hooks";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <RouterProvider router={getRoutes(isLoggedIn)} />
    </>
  );
}

export default App;
