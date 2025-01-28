import { Textarea, VisuallyHiddenInput } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import LinearProgress from "@mui/material/LinearProgress";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import days from "dayjs";

import { UserRole, Workspace } from "@types";
import { type FC, useState } from "react";
import { ClinicIconIcon } from "@assets";
import { useTranslation } from "react-i18next";
import { useAuth } from "@hooks";
import { InfoCard, InvitationForm } from "@components";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { isMobile } from "react-device-detect";
import { useUpdateWorkspaceMutation } from "@api";

type WorkspaceInfoProps = { workspace: Workspace | null };
const sx = { width: "100%", height: "100%" };

export const WorkspaceInfo: FC<WorkspaceInfoProps> = ({ workspace }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [cacheDate, setCacheDate] = useState(days());
  const [workspaceForm, setWorkspaceForm] = useState({
    image: workspace?.image,
    name: workspace?.name ?? "",
    notes: workspace?.notes ?? "",
  });
  const [workspaceImage, setWorkspaceImage] = useState<File>();
  const [updateWorkspaceData] = useUpdateWorkspaceMutation();

  if (!workspace || !user) return null;

  const canInviteUser =
    workspace.currentMembersCount < workspace.maxMembersCount &&
    [UserRole.admin, UserRole.owner, UserRole.manager].includes(user.role);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const odEditWorkspaceInfo = () => {
    if (!workspaceForm.name || (!workspaceImage && !workspaceForm.image))
      return;
    updateWorkspaceData({ ...workspaceForm, image: workspaceImage });
    setIsDataChanged(false);
  };

  const getImage = () => {
    if (!workspaceForm.image) return "";
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlPattern.test(workspaceForm?.image)) {
      return `${workspaceForm.image}?${cacheDate.format("YYYYMMDDHHmmss")}`;
    }
    return workspaceForm.image;
  };

  const renderViewMode = () => {
    return (
      <>
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
          <Typography gutterBottom variant="h5" component="div">
            {t("stuff")}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={
              (workspace.currentMembersCount * 100) / workspace.maxMembersCount
            }
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("currentStuff")}: {workspace.currentMembersCount}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("maxStuff")}: {workspace.maxMembersCount}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("maxStorage")}:{" "}
            {Math.round(workspace.patientMaxStorage / (100 * 100 * 100))}Gb
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Button
            disabled={!canInviteUser}
            sx={{ width: "100%" }}
            onClick={handleClick}
          >
            <PersonAddAlt1Icon sx={{ mr: 1 }} /> {t("addStuff")}
          </Button>
          <InvitationForm
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            onSubmit={() => setAnchorEl(null)}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {workspace.notes}
          </Typography>
        </Grid2>
      </>
    );
  };

  const renderEditModeInputs = () => {
    return (
      <>
        <Grid2 size={{ xs: 12, md: 5 }} sx={{ maxWidth: "250px" }}>
          <Box
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              maxHeight: "150px",
            }}
          >
            {workspaceForm.image ? (
              <CardMedia sx={sx} component="img" image={getImage()} />
            ) : (
              <ClinicIconIcon sx={sx} />
            )}
            {isEditingMode && (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  p: 0,
                  minWidth: "30px",
                }}
              >
                <EditIcon />
                <VisuallyHiddenInput
                  id="userImage"
                  name="userImage"
                  type="file"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      setWorkspaceImage?.(file);
                      reader.onloadend = () => {
                        setWorkspaceForm((prevState) => ({
                          ...prevState,
                          image: `${reader.result}`,
                        }));
                        setCacheDate(days());
                        setIsDataChanged(true);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            )}
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label={t("metadata.name")}
              variant="standard"
              value={workspaceForm.name}
              onChange={(e) => {
                setWorkspaceForm((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
                setIsDataChanged(true);
              }}
              required
            />
            {!workspaceForm.name && (
              <FormHelperText error={!workspaceForm.name}>
                {t("required", { keyPrefix: "errors" })}
              </FormHelperText>
            )}
            <Textarea
              id="workspaceNotes"
              value={workspace.notes}
              onChange={({ target }) => {
                setWorkspaceForm((prevState) => ({
                  ...prevState,
                  notes: target.value,
                }));
                setIsDataChanged(true);
              }}
            />
          </Box>
        </Grid2>
      </>
    );
  };

  return (
    <InfoCard
      className="workspace-info"
      onSubmit={odEditWorkspaceInfo}
      buttonLabel={t("save", { keyPrefix: "buttons" })}
      isEditMode={isEditingMode}
      setIsEditMode={setIsEditingMode}
      disabledButton={!isDataChanged}
      canEdit={!canInviteUser}
    >
      <Grid2
        gap={3}
        container
        wrap="wrap"
        sx={{ minWidth: isMobile ? "unset" : "530px" }}
      >
        {isEditingMode ? renderEditModeInputs() : renderViewMode()}
      </Grid2>
    </InfoCard>
  );
};
