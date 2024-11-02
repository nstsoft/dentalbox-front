import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import "./i18n";
import { useTranslation } from "react-i18next";
import days from "dayjs";
import { getRoutes } from "./Router";
import { useAuth, useLanguage } from "@hooks";

function App() {
  const { isLoggedIn } = useAuth();
  const { language } = useLanguage();

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    days.locale(language);
  }, [i18n, language]);

  return (
    <div className="App">
      <RouterProvider router={getRoutes(isLoggedIn)} />
    </div>
  );
}

export default App;
