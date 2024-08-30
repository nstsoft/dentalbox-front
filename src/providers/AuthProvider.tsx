import { useState, useCallback, type FC } from "react";

import { User, AuthState } from "@types";
import { AuthContext } from "./context";

const AUTH_TOKEN = "auth-token";
const REFRESH_TOKEN = "refresh-token";
const USER = "user";

export const AuthProvider: FC<{ children: any }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      const item = localStorage.getItem(AUTH_TOKEN);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    try {
      const item = localStorage.getItem(REFRESH_TOKEN);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const [user, setUser] = useState<User | null>(() => {
    try {
      const item = localStorage.getItem(USER);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const login = useCallback(
    (data: AuthState) => {
      if (!data.user && data.refreshToken && data.authToken) return;
      setAuthToken(data.authToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user);
      window.localStorage.setItem(
        REFRESH_TOKEN,
        JSON.stringify(data.refreshToken)
      );
      window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(data.authToken));
      window.localStorage.setItem(USER, JSON.stringify(data.user));
    },
    [setAuthToken, setRefreshToken, setUser]
  );

  const logout = useCallback(() => {
    setAuthToken(null);
    setRefreshToken(null);
    setUser(null);
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.removeItem(AUTH_TOKEN);
    window.localStorage.removeItem(USER);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshToken,
        authToken,
        login,
        logout,
        isLoggedIn: !!authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
