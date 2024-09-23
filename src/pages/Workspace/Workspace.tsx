import { useAuth } from "@hooks";
import Box from "@mui/material/Box";
import { Payments, SubscriptionInfo, WorkspaceInfo } from "./components";
import { UserRole } from "@types";

export const WorkspacePage = () => {
  const { workspace, user } = useAuth();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          gap: "24px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <WorkspaceInfo workspace={workspace} />
        <SubscriptionInfo />
      </Box>
      {user && [(UserRole.admin, UserRole.owner)].includes(user.role) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            gap: "24px",
            marginBottom: "20px",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <Payments />
        </Box>
      )}
    </Box>
  );
};
