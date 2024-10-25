import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import i18n from "./i18n.ts";
import { I18nextProvider } from "react-i18next";
import { AuthProvider, MenuProvider, LanguageProvider } from "@providers";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LanguageProvider>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale={"uk"}
            >
              <CssBaseline />
              <AuthProvider>
                <MenuProvider>
                  <App />
                </MenuProvider>
              </AuthProvider>
            </LocalizationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
