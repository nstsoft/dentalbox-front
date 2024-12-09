import { createContext } from "react";

import { NotificationsContextType } from "@types";

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);
