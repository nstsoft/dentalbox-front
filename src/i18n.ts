import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { EN } from "./i18n/en";
import { UA } from "./i18n/uk";

const resources = { en: EN, uk: UA };

const defaultLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage ? JSON.parse(defaultLanguage) : "uk",
  interpolation: { escapeValue: false },
});

export default i18n;
