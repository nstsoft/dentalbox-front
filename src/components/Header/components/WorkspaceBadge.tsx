import { type FC } from "react";
import { useAuth } from "@hooks";
import { Box, Typography, IconButton, Tooltip, Avatar } from "@mui/material";

export const WorkspaceBadge: FC = () => {
  const { workspace } = useAuth();

  if (!workspace) return null;

  return (
    <>
      <Box sx={{ flexGrow: 0, marginRight: "20px" }}>
        <Tooltip title={workspace.name}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={workspace.name} src={workspace.image} />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {workspace?.name}
      </Typography>
    </>
  );
};
