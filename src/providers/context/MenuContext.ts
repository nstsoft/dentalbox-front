import { createContext } from "react";

import { MenuContextType } from "@types";

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);
