import { useState, useCallback, type FC, type ReactElement } from "react";

import { User, AuthState } from "@types";
import { AuthContext } from "./context";

const AUTH_TOKEN = "auth-token";
const REFRESH_TOKEN = "refresh-token";
const USER = "user";
const WORKSPACES = "workspaces";

export const AuthProvider: FC<{ children: ReactElement }> = ({ children }) => {
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
  const [workspaces, setWorkspaces] = useState<
    { name: string; _id: string }[] | null
  >(() => {
    try {
      const item = localStorage.getItem(WORKSPACES);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const login = useCallback(
    (data: AuthState) => {
      setAuthToken(data.authToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user);
      setWorkspaces(data.workspaces);
      window.localStorage.setItem(
        REFRESH_TOKEN,
        JSON.stringify(data.refreshToken)
      );
      window.localStorage.setItem(AUTH_TOKEN, JSON.stringify(data.authToken));
      window.localStorage.setItem(USER, JSON.stringify(data.user));
      window.localStorage.setItem(WORKSPACES, JSON.stringify(data.workspaces));
    },
    [setAuthToken, setRefreshToken, setUser, setWorkspaces]
  );

  const logout = useCallback(() => {
    setAuthToken(null);
    setRefreshToken(null);
    setUser(null);
    setWorkspaces(null);
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.removeItem(AUTH_TOKEN);
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(WORKSPACES);
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
    window.localStorage.setItem(USER, JSON.stringify(userData));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshToken,
        workspaces,
        authToken,
        login,
        logout,
        updateUser,
        isLoggedIn: !!authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
