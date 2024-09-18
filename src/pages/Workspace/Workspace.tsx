import { Fragment, useEffect } from "react";
import { useLazyGetMyWorkspacesQuery } from "@api";
import { useLocalStorage, WORKSPACE, useAuth } from "@hooks";
import { Box, Button, ImageListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const WorkspacePage = () => {
  const navigate = useNavigate();

  const [getMyWorkspaces, { data: workspaces, status: statusWorkspaces }] =
    useLazyGetMyWorkspacesQuery();

  const [workspace] = useLocalStorage<string>(WORKSPACE, null);
  const { user } = useAuth();

  const isOwner =
    user?.roles.find((role) => role.workspace === workspace)?.role === "admin";

  console.log(workspaces);

  useEffect(() => {
    if (!workspaces && statusWorkspaces == "uninitialized") {
      getMyWorkspaces();
    }
  }, [getMyWorkspaces, statusWorkspaces, workspaces]);

  return (
    <Box component="section" className="page workspace">
      <Box
        sx={{
          padding: "20px",
        }}
      >
        {workspaces?.map((w) => (
          <Fragment key={w._id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                  {w.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "50px",
                    mb: 2,
                  }}
                >
                  <ImageListItem sx={{ width: "150px" }}>
                    <img src={w.image} alt={w.name} />
                  </ImageListItem>
                  <Box>
                    <Typography variant="h6">Some details:</Typography>
                    <Typography variant="body1">{w.description}</Typography>
                  </Box>
                </Box>
                <Button fullWidth variant="contained">
                  Invite users
                </Button>
              </Box>
              {isOwner && (
                <Box
                  sx={{
                    width: "50%",
                    border: "1px solid black",
                    padding: "10px",
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                      Subscription info
                    </Typography>
                    <Box></Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                      Current payment method:
                    </Typography>
                    <Box></Box>
                  </Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                border: "1px solid black",
                padding: "10px",
                height: "40vh",
              }}
            ></Box>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};
