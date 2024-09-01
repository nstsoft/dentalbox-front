import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Grid2,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { WorkspaceShortenItem } from "@types";
import { ClinicIconIcon } from "@assets";

type SelectWorkspaceProps = {
  workspaces: WorkspaceShortenItem[];
  isActive: boolean;
  selectWorkspace: (workspace: string) => void;
};

export const SelectWorkspaceDialog = ({
  isActive,
  workspaces,
  selectWorkspace,
}: SelectWorkspaceProps) => {
  const { t } = useTranslation("", { keyPrefix: "selectWorkspace" });

  const renderWorkspaceImage = (workspace: WorkspaceShortenItem) => {
    const sx = {
      height: { xs: 90, sm: 110, md: 130, lg: 150, xl: 170 },
      width: "100%",
    };
    if (!workspace.image) {
      return <CardMedia component={() => <ClinicIconIcon sx={sx} />} />;
    }
    return (
      <CardMedia
        component="img"
        sx={sx}
        image={workspace.image}
        alt={workspace.name}
      />
    );
  };

  return (
    <Dialog fullWidth disableEscapeKeyDown maxWidth={"lg"} open={isActive}>
      <DialogTitle>{t("workspaces")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("selectWorkspaceTest")}</DialogContentText>
        <br></br>
        <Grid2
          container
          spacing={2}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          {workspaces.map((workspace) => (
            <Grid2
              key={workspace._id}
              size={4}
              alignItems="center"
              justifyContent="space-around"
              alignContent="center"
              minWidth={120}
              flexGrow={1}
              onClick={() => selectWorkspace(workspace._id)}
            >
              <Card
                sx={{ height: { xs: 150, sm: 170, md: 190, lg: 220, xl: 250 } }}
                onClick={() => selectWorkspace(workspace._id)}
              >
                <CardActionArea>
                  {renderWorkspaceImage(workspace)}
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {workspace.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};
