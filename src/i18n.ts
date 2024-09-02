import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { EN } from "./i18n/en";
import { UA } from "./i18n/ua";

const resources = { en: EN, ua: UA };

const defaultLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage ? JSON.parse(defaultLanguage) : "ua",
  interpolation: { escapeValue: false },
});

export default i18n;
