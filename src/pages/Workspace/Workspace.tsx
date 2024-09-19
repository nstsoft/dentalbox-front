import { useLocalStorage, WORKSPACE, useAuth } from "@hooks";
import { Box } from "@mui/material";
import { SubscriptionInfo, WorkspaceInfo } from "./components";

export const WorkspacePage = () => {
  const [workspaceId] = useLocalStorage<string>(WORKSPACE, null);
  const { user, workspace } = useAuth();

  const isOwner =
    user?.roles.find((role) => role.workspace === workspaceId)?.role ===
    "admin";

  return (
    <Box component="section" className="page workspace">
      {workspace && (
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <WorkspaceInfo workspace={workspace} />
            {isOwner && <SubscriptionInfo subscription={null} />}
          </Box>
          <Box
            sx={{
              width: "100%",
              border: "1px solid black",
              padding: "10px",
              height: "40vh",
            }}
          ></Box>
        </Box>
      )}
    </Box>
  );
};
