import { useContext } from "react";
import { LanguageContext } from "@providers";
import { LanguageContextType } from "@types";

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within an LanguageProvider");
  }
  return context;
};
