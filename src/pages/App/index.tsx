import { type FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useLazyGetMeQuery,
  useLazyConfirmOtpQuery,
  useLazyGetMyWorkspacesQuery,
  useLazyGetMySubscriptionQuery,
} from "@api";
import { useLocalStorage, WORKSPACE, useAuth, useSideMenu } from "@hooks";
import { ConfirmOtpDialog, SelectWorkspaceDialog } from "@components";
import Box from "@mui/material/Box";
import { SideMenu } from "@components";
import { CLOSED_MENU_WIDTH, OPENED_MENU_WIDTH } from "@utils";
import { isMobile, isTablet } from "react-device-detect";

const isMobileMenu = isMobile || isTablet;

const getPageLeftMargin = (isOpenMenu: boolean) => {
  if (isMobileMenu) return 0;
  return isOpenMenu ? `${OPENED_MENU_WIDTH}px` : `${CLOSED_MENU_WIDTH}px`;
};

type Props = {
  isAuthenticated: boolean;
};

export const ProtectedApp: FC<Props> = ({ isAuthenticated }) => {
  const { isOpenMenu } = useSideMenu();

  const [getMe, { status: meStatus, data: me }] = useLazyGetMeQuery();
  const [confirmOtp, { isSuccess, error }] = useLazyConfirmOtpQuery();
  const [getMyWorkspaces, { data: workspaces, status: statusWorkspaces }] =
    useLazyGetMyWorkspacesQuery();

  const [
    getMySubscription,
    { data: subscription, status: statusSubscription },
  ] = useLazyGetMySubscriptionQuery();

  const [workspace, setWorkspace] = useLocalStorage<string>(WORKSPACE, null);
  const {
    user,
    updateUser,
    setWorkspace: setAuthWorkspace,
    availableWorkspaces,
    setAvailableWorkspaces,
  } = useAuth();

  useEffect(() => {
    if (user && isSuccess && !user?.isVerified) {
      updateUser({ ...user, isVerified: true });
    }
  }, [isSuccess, updateUser, user]);

  useEffect(() => {
    if (statusWorkspaces == "uninitialized") {
      getMyWorkspaces();
    }
  }, [getMyWorkspaces, statusWorkspaces, workspace]);

  useEffect(() => {
    if (!availableWorkspaces.length && workspaces) {
      setAvailableWorkspaces(workspaces);
    }
  }, [availableWorkspaces, setAvailableWorkspaces, workspaces]);

  useEffect(() => {
    if (meStatus == "uninitialized" && workspace) {
      getMe();
    }
  }, [getMe, meStatus, user?.isVerified, workspace]);

  useEffect(() => {
    if (
      meStatus == "fulfilled" &&
      workspace &&
      statusSubscription === "uninitialized"
    ) {
      getMySubscription();
    }
  }, [getMySubscription, meStatus, statusSubscription, workspace]);

  useEffect(() => {
    if (me?.user?.role) {
      updateUser(me?.user);
    }
  }, [me?.user, updateUser]);

  useEffect(() => {
    if (me?.workspace) {
      setAuthWorkspace(me?.workspace);
    }
  }, [me?.workspace, setAuthWorkspace]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <section className="app-layout">
      <SelectWorkspaceDialog
        isActive={!workspace}
        workspaces={workspaces ?? []}
        selectWorkspace={setWorkspace}
      />
      <ConfirmOtpDialog
        resendOtp={() => {}}
        isActive={!!user && !user?.isVerified && !!workspace}
        confirmOtp={confirmOtp}
        error={(error as { data: { message: string } })?.data?.message}
      />
      {!subscription || !workspace || !user?.isVerified ? null : (
        <>
          <SideMenu />
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 1, sx: 1.5, md: 1.5, lg: 3, xl: 3 },
              marginLeft: getPageLeftMargin(isOpenMenu),
              transition: "margin-left 0.3s",
            }}
          >
            <Outlet />
          </Box>
        </>
      )}
    </section>
  );
};
