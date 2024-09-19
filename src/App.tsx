import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "./i18n";

import { getRoutes } from "./Router";
import { useAuth } from "@hooks";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <RouterProvider router={getRoutes(isLoggedIn)} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
