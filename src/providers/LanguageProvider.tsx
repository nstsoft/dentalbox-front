import { useState, type FC, type ReactElement, useEffect } from "react";
import { LanguageContext } from "./context";
import { LANGUAGES } from "@types";
import days from "dayjs";
import { useLocalStorage } from "@hooks";
import { LANGUAGE } from "@utils";

export const LanguageProvider: FC<{
  children: ReactElement[] | ReactElement;
}> = ({ children }) => {
  const [languageInStorage, setLanguageInStorage] = useLocalStorage<LANGUAGES>(
    LANGUAGE,
    LANGUAGES.uk
  );

  const [language, setLanguage] = useState<LANGUAGES>(languageInStorage);

  useEffect(() => {
    days.locale("ua");
    setLanguageInStorage(language);
  }, [language, setLanguageInStorage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
