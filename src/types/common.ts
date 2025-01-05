import { SocketMessage } from "./websocket";

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

export interface WebsocketContextType {
  message: SocketMessage | null;
  isConnected: boolean;
  connect: () => void;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
