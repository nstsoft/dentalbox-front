import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import i18n from "./i18n.ts";
import { I18nextProvider } from "react-i18next";
import {
  AuthProvider,
  MenuProvider,
  LanguageProvider,
  WebsocketProvider,
} from "@providers";
import "./index.scss";
import "dayjs/locale/uk";
import "dayjs/locale/en";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <WebsocketProvider>
            <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                <AuthProvider>
                  <MenuProvider>
                    <App />
                  </MenuProvider>
                </AuthProvider>
              </LocalizationProvider>
            </Provider>
          </WebsocketProvider>
        </LanguageProvider>
      </I18nextProvider>
    </ThemeProvider>
  </StrictMode>
);
