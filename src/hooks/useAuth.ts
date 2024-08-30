import { useContext } from "react";

import { AuthContextType } from "@types";
import { AuthContext } from "@providers";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
