import { useLocalStorage, WORKSPACE, useAuth } from "@hooks";
import { Box } from "@mui/material";
import { Payments, SubscriptionInfo, WorkspaceInfo } from "./components";

export const WorkspacePage = () => {
  const [workspaceId] = useLocalStorage<string>(WORKSPACE, null);
  const { user, workspace } = useAuth();

  const isOwner =
    user?.roles.find((role) => role.workspace === workspaceId)?.role ===
    "admin";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: "50px",
          marginBottom: "20px",
        }}
      >
        <WorkspaceInfo workspace={workspace} />
        {isOwner && <SubscriptionInfo />}
      </Box>
      <Payments />
    </Box>
  );
};
