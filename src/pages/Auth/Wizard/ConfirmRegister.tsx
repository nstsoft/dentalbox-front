import { type FC, type FormEvent, useEffect, useState } from "react";

import { useRegisterMutation } from "@api";
import type { WorkspaceForm, UserForm } from "./types";
import {
  Box,
  Button,
  Grid2,
  CardActionArea,
  CardContent,
  Typography,
  CardHeader,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { Card, ErrorTypography } from "@components";
import { Product } from "@types";
import { useTranslation } from "react-i18next";

type Props = {
  workspace: WorkspaceForm;
  user: UserForm;
  product: Product;
  confirmRegister: (event: FormEvent<HTMLFormElement>) => void;
};

export const ConfirmRegister: FC<Props> = ({
  workspace,
  product,
  user,
  confirmRegister,
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
        alignContent="center"
        wrap="wrap"
        alignSelf="center"
        sx={{ maxWidth: "1000px" }}
      >
        <Grid2 size={6} minWidth={350} wrap="wrap">
          <Card>
            <CardActionArea>
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
            </CardActionArea>
          </Card>
        </Grid2>
        <Grid2 size={6} minWidth={350} sx={{ height: "100%" }}>
          <Card sx={{ height: "100%" }}>
            <CardActionArea>
              <CardHeader
                sx={{ textAlign: "center" }}
                title={t("workspaceData")}
              />
              <CardContent>
                <Typography textAlign="left" gutterBottom variant="subtitle1">
                  <a>{t("workspaceName")}:</a> {workspace.name}
                </Typography>
                <Typography textAlign="left" gutterBottom variant="subtitle1">
                  <a>{t("workspaceDescription")}:</a> {workspace.description}
                </Typography>
              </CardContent>
            </CardActionArea>
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
              <>
                <Button
                  sx={{ width: "150px" }}
                  type="submit"
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
              </>
            )}
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
