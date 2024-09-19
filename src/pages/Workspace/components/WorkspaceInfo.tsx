import { Card } from "@components";
import {
  Box,
  Button,
  Divider,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Workspace } from "@types";
import { FC } from "react";
import { ClinicIconIcon } from "@assets";

type WorkspaceInfoProps = {
  workspace: Workspace | null;
};

const sx = { width: "100%", maxWidth: 200, height: 140 };

export const WorkspaceInfo: FC<WorkspaceInfoProps> = ({ workspace }) => {
  if (!workspace) return null;
  return (
    <Card sx={{ maxWidth: 345, m: 0, width: "100%" }}>
      <Typography
        className="highlighted"
        gutterBottom
        variant="h5"
        component="div"
      >
        Workspace
      </Typography>
      {workspace.image ? (
        <CardMedia sx={sx} component="img" image={workspace.image} />
      ) : (
        <ClinicIconIcon sx={sx} />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {workspace?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {workspace.notes}
        </Typography>
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography variant="h6">Members:</Typography>
          <Typography variant="body1" sx={{ fontSize: "16px" }}>
            {workspace?.currentMembersCount}/{workspace?.maxMembersCount}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained">
          Invite users
        </Button>
      </CardActions>
    </Card>
  );
};
