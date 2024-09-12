import { useEffect } from "react";
import {
  useLazyGetMeQuery,
  useLazyConfirmOtpQuery,
  useLazyGetMyWorkspacesQuery,
  useLazyGetMySubscriptionQuery,
} from "@api";
import { useLocalStorage, WORKSPACE, useAuth } from "@hooks";
import { ConfirmOtpDialog, SelectWorkspaceDialog } from "@components";

export const WorkspacePage = () => {
  const [getMe, { status: meStatus, data: me }] = useLazyGetMeQuery();
  const [confirmOtp, { isSuccess, error }] = useLazyConfirmOtpQuery();
  const [getMyWorkspaces, { data: workspaces, status: statusWorkspaces }] =
    useLazyGetMyWorkspacesQuery();

  const [getMySubscription, { status: statusSubscription }] =
    useLazyGetMySubscriptionQuery();

  const [workspace, setWorkspace] = useLocalStorage<string>(WORKSPACE, null);
  const { user, updateUser } = useAuth();

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

  return (
    <section className="page workspace">
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
      Workspace
    </section>
  );
};
