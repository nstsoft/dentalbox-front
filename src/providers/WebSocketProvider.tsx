import {
  useState,
  type FC,
  type ReactElement,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { WebsocketContext } from "./context";
import { SocketMessage } from "@types";
import { useCookie } from "../hooks/useCookie";
import { AUTH_TOKEN } from "@utils";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

export const WebsocketProvider: FC<{
  children: ReactElement[] | ReactElement;
}> = ({ children }) => {
  const [message, setMessage] = useState<SocketMessage | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { getCookie } = useCookie();

  const connect = useCallback(() => {
    if (
      !socketRef.current ||
      socketRef.current.readyState === WebSocket.CLOSED
    ) {
      console.log("Creating new WebSocket connection...");
      const token = getCookie(AUTH_TOKEN);
      const workspace = JSON.parse(localStorage.getItem("workspace") ?? "");
      const url = `${socketUrl}?token=${token}&workspace=${workspace}`;

      socketRef.current = new WebSocket(url);
      socketRef.current.onopen = () => {
        console.log("socket connected");
        setIsConnected(true);
      };

      socketRef.current.onmessage = (event) => {
        console.log("Websocket event", event.data);
        setMessage(JSON.parse(event.data));
      };

      socketRef.current.onclose = () => setIsConnected(false);

      socketRef.current.onerror = (error) =>
        console.error("WebSocket error:", error);
    } else {
      console.log("WebSocket already connected or in progress.");
    }
  }, []);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log("Cleaning up WebSocket connection...");
        socketRef.current.close();
        socketRef.current = null;
      }
      setIsConnected(false);
    };
  }, []);

  return (
    <WebsocketContext.Provider value={{ isConnected, connect, message }}>
      {children}
    </WebsocketContext.Provider>
  );
};
