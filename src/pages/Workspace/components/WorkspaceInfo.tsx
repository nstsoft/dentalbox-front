import { Card } from "@components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import LinearProgress from "@mui/material/LinearProgress";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";

import { Workspace } from "@types";
import { FC } from "react";
import { ClinicIconIcon } from "@assets";
import { useTranslation } from "react-i18next";
import { useAuth } from "@hooks";

type WorkspaceInfoProps = { workspace: Workspace | null };
const sx = { width: "100%", height: "100%" };

export const WorkspaceInfo: FC<WorkspaceInfoProps> = ({ workspace }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });
  const { user } = useAuth();
  if (!workspace || !user) return null;

  const canInviteUser =
    workspace.currentMembersCount < workspace.maxMembersCount &&
    ["admin", "manager"].includes(user.role);

  return (
    <Card sx={{ m: 0, width: "100%", position: "relative" }}>
      <Button
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: user?.role === "admin" ? "flex" : "none",
        }}
      >
        <EditIcon />
      </Button>
      <Grid2 gap={1} container wrap="wrap">
        <Grid2 size={{ xs: 12, md: 4 }} sx={{ maxWidth: "250px" }}>
          <Typography
            className="highlighted"
            gutterBottom
            variant="h5"
            component="div"
          >
            {workspace?.name}
          </Typography>
          <Box sx={{ borderRadius: "20px", overflow: "hidden" }}>
            {workspace.image ? (
              <CardMedia sx={sx} component="img" image={workspace.image} />
            ) : (
              <ClinicIconIcon sx={sx} />
            )}
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Grid2 size={12}>
            <CardContent sx={{ padding: 0 }}>
              <Typography gutterBottom variant="h5" component="div">
                {t("stuff")}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={
                  (workspace.currentMembersCount * 100) /
                  workspace.maxMembersCount
                }
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {t("currentStaff")}: {workspace.currentMembersCount}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {t("maxStaff")}: {workspace.maxMembersCount}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Button disabled={!canInviteUser} sx={{ width: "100%" }}>
                <PersonAddAlt1Icon sx={{ mr: 1 }} /> {t("addStaff")}
              </Button>
            </CardContent>
          </Grid2>
        </Grid2>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {workspace.notes}
        </Typography>
      </Grid2>
    </Card>
  );
};
