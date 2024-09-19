import { type FC, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useLazyGetMeQuery,
  useLazyConfirmOtpQuery,
  useLazyGetMyWorkspacesQuery,
  useLazyGetMySubscriptionQuery,
} from "@api";
import { useLocalStorage, WORKSPACE, useAuth } from "@hooks";
import { ConfirmOtpDialog, SelectWorkspaceDialog } from "@components";
import { Box } from "@mui/material";
import { SideMenu } from "@components";
import { OPENED_MENU_WIDTH, CLOSED_MENU_WIDTH } from "@utils";

type Props = {
  isAuthenticated: boolean;
};

export const ProtectedApp: FC<Props> = ({ isAuthenticated }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [getMe, { status: meStatus, data: me }] = useLazyGetMeQuery();
  const [confirmOtp, { isSuccess, error }] = useLazyConfirmOtpQuery();
  const [getMyWorkspaces, { data: workspaces, status: statusWorkspaces }] =
    useLazyGetMyWorkspacesQuery();

  const [
    getMySubscription,
    { data: subscription, status: statusSubscription },
  ] = useLazyGetMySubscriptionQuery();

  const [workspace, setWorkspace] = useLocalStorage<string>(WORKSPACE, null);
  const { user, updateUser, setWorkspace: setAuthWorkspace } = useAuth();

  useEffect(() => {
    if (user && isSuccess && !user?.isVerified) {
      updateUser({ ...user, isVerified: true });
    }
  }, [isSuccess, updateUser, user]);

  useEffect(() => {
    if (!workspace && statusWorkspaces == "uninitialized") {
      getMyWorkspaces();
    }
  }, [getMyWorkspaces, statusWorkspaces, workspace]);

  useEffect(() => {
    if (meStatus == "uninitialized" && user?.isVerified && workspace) {
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
    <section>
      <SelectWorkspaceDialog
        isActive={!workspace}
        workspaces={workspaces ?? []}
        selectWorkspace={setWorkspace}
      />
      <ConfirmOtpDialog
        resendOtp={() => {}}
        isActive={!user?.isVerified && !!workspace}
        confirmOtp={confirmOtp}
        error={(error as { data: { message: string } })?.data?.message}
      />
      {!subscription || !workspace || !user?.isVerified ? null : (
        <>
          <SideMenu setIsOpen={setIsOpenMenu} isOpen={isOpenMenu} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
              marginLeft: isOpenMenu
                ? `${OPENED_MENU_WIDTH}px`
                : `${CLOSED_MENU_WIDTH}px`,
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
