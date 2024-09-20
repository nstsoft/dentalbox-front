import { useContext } from "react";

import { MenuContextType } from "@types";
import { MenuContext } from "@providers";

export const useSideMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
