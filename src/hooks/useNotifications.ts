import { useContext } from "react";

import { NotificationsContextType } from "@types";
import { NotificationsContext } from "@providers";

export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications error");
  }
  return context;
};
