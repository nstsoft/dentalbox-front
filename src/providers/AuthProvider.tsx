import { useState, useCallback, type FC, type ReactElement } from "react";

import { User, AuthState, Workspace } from "@types";
import { AuthContext } from "./context";

const AUTH_TOKEN = "auth-token";
const REFRESH_TOKEN = "refresh-token";
const USER = "user";
const WORKSPACE = "workspace";

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
  const [availableWorkspaces, setWorkspacesList] = useState<Workspace[]>([]);

  const [workspace, setWorkspaceData] = useState<Workspace | null>(null);

  const login = useCallback(
    (data: AuthState) => {
      setAuthToken(data.authToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user);

      localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.refreshToken));
      localStorage.setItem(AUTH_TOKEN, JSON.stringify(data.authToken));
      localStorage.setItem(USER, JSON.stringify(data.user));
    },
    [setAuthToken, setRefreshToken, setUser]
  );

  const logout = useCallback(() => {
    setAuthToken(null);
    setRefreshToken(null);
    setUser(null);
    setWorkspaceData(null);

    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(WORKSPACE);
  }, []);

  const changeWorkspace = useCallback((workspaceId: string) => {
    setUser(null);
    setWorkspaceData(null);

    localStorage.removeItem(USER);
    localStorage.removeItem(WORKSPACE);
    localStorage.setItem(WORKSPACE, JSON.stringify(workspaceId));
    window.location.reload();
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem(USER, JSON.stringify(userData));
  }, []);

  const setWorkspace = useCallback((workspace: Workspace) => {
    setWorkspaceData(workspace);
  }, []);

  const setAvailableWorkspaces = useCallback((workspace: Workspace[]) => {
    setWorkspacesList(workspace);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshToken,
        workspace,
        authToken,
        login,
        logout,
        updateUser,
        setWorkspace,
        availableWorkspaces,
        setAvailableWorkspaces,
        isLoggedIn: !!authToken,
        changeWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
