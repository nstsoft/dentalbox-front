import { useQuery, useAuth } from "@hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@components";
import { Grid2, Typography, Button, CardHeader } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useTheme } from "@mui/material/styles";

type Query = {
  error?: string;
  provider: string;
  status: string;
  authToken?: string;
  refreshToken?: string;
  user?: string;
};

const ErrorTitle = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
    <div>
      <Typography variant="h6" sx={{ color: theme.palette.error.main }}>
        <ReportProblemIcon /> {title}
      </Typography>
    </div>
  );
};

export const Oauth2 = () => {
  const query: Query = useQuery();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "login" });

  const isAuthenticated =
    query.status === "200" &&
    query.authToken &&
    query.refreshToken &&
    query.user;

  useEffect(() => {
    if (isAuthenticated) {
      login({
        refreshToken: query.refreshToken!,
        authToken: query.authToken!,
        user: JSON.parse(query.user ?? "{}"),
      });
      navigate("/app");
    }
  });

  if (query.status === "200") {
    return null;
  }
  return (
    <div>
      <Grid2
        container
        spacing={2}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        sx={{ height: "calc(100vh - 64px)", width: "100vw" }}
      >
        <Grid2
          size={4}
          alignItems="center"
          justifyContent="space-around"
          alignContent="center"
          minWidth={250}
          flexGrow={1}
        >
          <Card sx={{ maxWidth: "345px" }}>
            {query.error && (
              <CardHeader
                title={<ErrorTitle title={t("authenticationErrorHeader")} />}
                subheader={t("authenticationErrorText")}
              />
            )}

            <Button variant="contained" onClick={() => navigate("/auth/login")}>
              {t("returnToLogin", { keyPrefix: "buttons" })}
            </Button>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};
