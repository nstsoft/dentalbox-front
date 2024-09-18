import { type FC } from "react";
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

type Props = {
  isAuthenticated: boolean;
};

export const ProtectedApp: FC<Props> = ({ isAuthenticated }) => {
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
      {!subscription || !workspace || !user?.isVerified ? null : <Outlet />}
    </section>
  );
};
