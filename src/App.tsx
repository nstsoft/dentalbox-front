import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import "./i18n";
import { useTranslation } from "react-i18next";
import days from "dayjs";
import { getRoutes } from "./Router";
import { useAuth, useLanguage, useWebsocket, useNotifications } from "@hooks";
import { ToastContainer } from "react-toastify";
import { Message, WS_EVENTS } from "@types";

function App() {
  const { isLoggedIn, workspace } = useAuth();
  const { language } = useLanguage();
  const { isConnected, connect, message } = useWebsocket();
  const { getStats, receiveMessage } = useNotifications();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    days.locale(language);
  }, [i18n, language]);

  useEffect(() => {
    if (isLoggedIn && !isConnected && workspace) {
      connect();
    }
  }, [connect, isConnected, isLoggedIn, workspace]);

  useEffect(() => {
    if (isLoggedIn) {
      getStats();
    }
  }, [getStats, isLoggedIn]);

  useEffect(() => {
    if (message?.action === WS_EVENTS.NEW_MESSAGE) {
      receiveMessage(message.data as Message);
    }
  }, [message, receiveMessage]);

  return (
    <div className="App">
      <RouterProvider router={getRoutes(isLoggedIn)} />
      <ToastContainer
        role="alert"
        position="top-right"
        autoClose={false}
        closeOnClick={false}
        theme="colored"
      />
    </div>
  );
}

export default App;
