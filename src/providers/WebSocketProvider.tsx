import {
  useState,
  type FC,
  type ReactElement,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { WebsocketContext } from "./context";
import { SocketMessage, WS_ACTIONS, WS_EVENTS } from "@types";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

export const WebsocketProvider: FC<{
  children: ReactElement[] | ReactElement;
}> = ({ children }) => {
  const [message, setMessages] = useState<SocketMessage | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (
      !socketRef.current ||
      socketRef.current.readyState === WebSocket.CLOSED
    ) {
      console.log("Creating new WebSocket connection...");
      socketRef.current = new WebSocket(socketUrl);

      socketRef.current.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connected:", socketUrl);
        const data = {
          action: WS_ACTIONS.checkin,
          data: {
            token: JSON.parse(localStorage.getItem("auth-token") ?? ""),
            workspace: JSON.parse(localStorage.getItem("workspace") ?? ""),
            timestamp: new Date().toISOString(),
          },
        };
        console.log("Sending check-in data:", data);
        socketRef.current?.send(JSON.stringify(data));
      };

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data) as SocketMessage;
        console.log(message);
        if (message.action === WS_EVENTS.checkin_completed) {
          setCheckedIn(true);
        } else {
          setMessages(message);
        }
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket disconnected");
        setCheckedIn(false);
        setIsConnected(false);
      };

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
      setCheckedIn(false);
      setIsConnected(false);
    };
  }, []);

  return (
    <WebsocketContext.Provider
      value={{ isConnected, checkedIn, connect, message }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};
