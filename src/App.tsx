import { RouterProvider } from "react-router-dom";
import './i18n';

import { getRoutes } from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={getRoutes(true)} />
    </>
  );
}

export default App;
