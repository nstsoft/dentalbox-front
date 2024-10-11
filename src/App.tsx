import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect } from "react";
import "./i18n";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";
import { getRoutes } from "./Router";
import { useAuth, useLanguage } from "@hooks";

function App() {
  const { isLoggedIn } = useAuth();
  const { language } = useLanguage();

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    moment.locale(language);
  }, [i18n, language]);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <RouterProvider router={getRoutes(isLoggedIn)} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
