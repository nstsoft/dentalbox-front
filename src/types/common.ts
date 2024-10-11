export interface MenuContextType {
  isOpenMenu: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

export enum Sex {
  male = "male",
  female = "female",
}
export enum LANGUAGES {
  en = "en",
  uk = "uk",
}

export interface LanguageContextType {
  language: LANGUAGES;
  setLanguage: (language: LANGUAGES) => void;
}
