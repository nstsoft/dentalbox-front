import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { EN } from "./i18n/en";
import { UA } from "./i18n/ua";

const resources = { en: EN, ua: UA };

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
