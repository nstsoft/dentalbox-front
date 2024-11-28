import { useContext } from "react";

import { WebsocketContextType } from "@types";
import { WebsocketContext } from "@providers";

export const useWebsocket = (): WebsocketContextType => {
  const context = useContext(WebsocketContext);
  if (context === undefined) {
    throw new Error("Websocket context error");
  }
  return context;
};
