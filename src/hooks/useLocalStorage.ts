import { useState } from "react";

export const AUTH_TOKEN = "auth-token";
export const REFRESH_TOKEN = "refresh-token";
export const USER = "user";
export const WORKSPACE = "workspace";
export const LANGUAGE = "language";

type KeyType =
  | typeof AUTH_TOKEN
  | typeof REFRESH_TOKEN
  | typeof USER
  | typeof WORKSPACE
  | typeof LANGUAGE;

export const useLocalStorage = <T>(key: KeyType, initialValue?: unknown) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    if (!value) return;
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const clear = () => {
    window.localStorage.removeItem(key);
  };

  return [storedValue, setValue, clear] as [
    T,
    (value: T) => void,
    clear: () => void
  ];
};
