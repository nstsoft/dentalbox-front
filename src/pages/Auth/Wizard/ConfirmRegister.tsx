import { type FC, type FormEvent, useEffect, useState } from "react";

import { useRegisterMutation } from "@api";
import type { WorkspaceForm } from "./types";
import type { UserForm } from "@types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

import { Card, ErrorTypography } from "@elements";
import { Product } from "@types";
import { useTranslation } from "react-i18next";

type Props = {
  workspace: WorkspaceForm;
  user: UserForm;
  product: Product;
  confirmRegister: (event: FormEvent<HTMLFormElement>) => void;
  previousStep: () => void;
};

export const ConfirmRegister: FC<Props> = ({
  workspace,
  product,
  user,
  confirmRegister,
  previousStep,
}) => {
  const [, { error: registerError, status }] = useRegisterMutation();

  const [checkedTOS, setCheckedTOS] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("", { keyPrefix: "confirmRegister" });

  useEffect(() => {
    const err = registerError as Error;
    if (registerError) {
      setError(err?.message ?? err);
      setLoading(false);
    }
  }, [registerError]);

  useEffect(() => {
    if (status === "fulfilled") {
      setError(undefined);
    }
  }, [status]);

  if (!workspace || !user || !product) return null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!checkedTOS) {
      setError(t("acceptTos"));
      setLoading(false);
      return;
    }

    confirmRegister(event);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        alignSelf="center"
        sx={{ maxWidth: "1000px" }}
      >
        <Grid2 size={6} minWidth={350}>
          <Card sx={{ minHeight: "360px" }}>
            <CardHeader sx={{ textAlign: "center" }} title={t("userData")} />
            <CardContent>
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("email")}:</a> {user.email}
              </Typography>
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("name")}:</a> {user.name}
              </Typography>
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("secondName")}:</a> {user.secondName}
              </Typography>
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("surname")}:</a> {user.surname}
              </Typography>
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("dob")}:</a> {user.dob}
              </Typography>
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("role")}:</a> {t("owner")}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={6} minWidth={350}>
          <Card sx={{ minHeight: "360px" }}>
            <CardHeader
              sx={{ textAlign: "center" }}
              title={t("workspaceData")}
            />
            <CardContent>
              <CardMedia
                sx={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  mb: 2,
                }}
                component="img"
                image={workspace.image}
                alt={workspace.image}
              />
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("workspaceName")}:</a> {workspace.name}
              </Typography>
              <Typography textAlign="left" gutterBottom variant="subtitle1">
                <a>{t("workspaceDescription")}:</a> {workspace.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={8} spacing={2}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 0,
            }}
          >
            <ErrorTypography gutterBottom variant="subtitle1">
              {error}
            </ErrorTypography>
            <FormControlLabel
              sx={{ width: "100%" }}
              control={<Checkbox />}
              checked={checkedTOS}
              onChange={() => {
                setError(undefined);
                setCheckedTOS((p) => !p);
                setLoading(false);
              }}
              label={t("checkbox")}
            />
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  onClick={previousStep}
                  sx={{ width: "150px" }}
                  fullWidth
                  variant="outlined"
                >
                  {t("back", { keyPrefix: "buttons" })}
                </Button>
                <Button
                  sx={{ width: "170px" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  {t("signUp", { keyPrefix: "buttons" })}
                </Button>
              </Box>
            )}
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
