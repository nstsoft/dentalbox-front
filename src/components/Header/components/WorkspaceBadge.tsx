import { type FC } from "react";
import { useAuth } from "@hooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

export const WorkspaceBadge: FC = () => {
  const { workspace, isLoggedIn } = useAuth();

  if (!workspace || !isLoggedIn) return null;

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
