import { useState, useCallback, type FC, type ReactElement } from "react";
import { useDispatch } from "react-redux";
import { User, AuthState, Workspace } from "@types";
import { AuthContext } from "./context";
import { authApi } from "@api";
import { AUTH_TOKEN, REFRESH_TOKEN, USER, WORKSPACE } from "@utils";
import { useCookie } from "../hooks/useCookie";

export const AuthProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const dispatch = useDispatch();
  const { setCookie, getCookie, cleanCookie } = useCookie();

  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      const item = getCookie(AUTH_TOKEN);
      return item ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    try {
      const item = getCookie(REFRESH_TOKEN);
      return item ?? null;
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

      setCookie(AUTH_TOKEN, data.authToken);
      setCookie(REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(USER, JSON.stringify(data.user));
    },
    [setAuthToken, setRefreshToken, setUser, setCookie]
  );

  const logout = useCallback(() => {
    dispatch(authApi.util.resetApiState());
    setAuthToken(null);
    setRefreshToken(null);
    setUser(null);
    setWorkspaceData(null);

    cleanCookie();
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
