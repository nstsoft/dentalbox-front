import { useEffect, useState } from "react";
import { useLazyGetMeQuery, useLazyConfirmOtpQuery } from "@api";
import { useLocalStorage, WORKSPACE, useAuth } from "@hooks";
import { ConfirmOtpDialog, SelectWorkspaceDialog } from "@components";

export const WorkspacePage = () => {
  const [getMe, { data: me, status }] = useLazyGetMeQuery();
  const [confirmOtp, { isSuccess, error, status: confirmOtpStatus }] =
    useLazyConfirmOtpQuery();
  const [workspace, setWorkspace] = useLocalStorage<string>(WORKSPACE, null);

  const { workspaces, user, updateUser } = useAuth();

  console.log({
    confirmOtpStatus,
    status,
    user,
  });

  useEffect(() => {
    if (user && isSuccess && !user?.isVerified) {
      updateUser({ ...user, isVerified: true });
    }
  }, [isSuccess, updateUser, user]);

  useEffect(() => {
    if (status == "uninitialized" && user?.isVerified) {
      getMe();
    }
  }, [getMe, status, user?.isVerified]);

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
