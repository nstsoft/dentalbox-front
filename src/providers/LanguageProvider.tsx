import { useState, type FC, type ReactElement, useEffect } from "react";
import { LanguageContext } from "./context";
import { LANGUAGES } from "@types";
import moment from "moment/min/moment-with-locales";
import { LANGUAGE, useLocalStorage } from "@hooks";

export const LanguageProvider: FC<{ children: ReactElement[] }> = ({
  children,
}) => {
  const [languageInStorage, setLanguageInStorage] = useLocalStorage<LANGUAGES>(
    LANGUAGE,
    LANGUAGES.uk
  );

  const [language, setLanguage] = useState<LANGUAGES>(languageInStorage);

  useEffect(() => {
    moment.locale("ua");
    setLanguageInStorage(language);
  }, [language, setLanguageInStorage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
