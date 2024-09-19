import { Card } from "@components";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Workspace } from "@types";
import { FC } from "react";

type WorkspaceInfoProps = {
  workspace: Workspace | null;
};

export const WorkspaceInfo: FC<WorkspaceInfoProps> = ({ workspace }) => {
  return (
    <Card sx={{ m: 0 }}>
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        {workspace?.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          mb: 2,
        }}
      >
        <img
          style={{ width: "150px", height: "150px" }}
          src={workspace?.image}
          alt={workspace?.name}
        />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Typography variant="h6">Notes:</Typography>
            <Typography variant="body1">{workspace?.notes}</Typography>
          </Box>
          <Divider
            color="black"
            sx={{
              mb: 1,
            }}
          />

          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Typography variant="h6">Members:</Typography>
            <Typography variant="body1" sx={{ fontSize: "16px" }}>
              {workspace?.currentMembersCount}/{workspace?.maxMembersCount}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button fullWidth variant="contained">
        Invite users
      </Button>
    </Card>
  );
};
