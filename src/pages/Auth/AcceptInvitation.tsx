import { FC, useState, useEffect, ReactNode } from "react";
import { UserData } from "./Wizard";
import { Avatar, Box, Button, Grid2, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazyAcceptInvitationQuery } from "@api";
import { Card } from "@elements";
import { useTranslation } from "react-i18next";
import type { UserForm } from "@types";
import { ErrorTypography } from "@elements";

type InvitationProps = { workspaceName: string; workspaceImage: string };

export const Invitation: FC<InvitationProps> = ({
  workspaceName,
  workspaceImage,
}) => (
  <>
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Avatar src={workspaceImage} alt={workspaceName} />
      <Typography variant="h5">{workspaceName}</Typography>
    </Box>

    <Typography variant="body1">
      Please accept invitation from workspace {workspaceName}
    </Typography>
  </>
);
export const ErrorBlock: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      height: "calc(100vh - 96px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </Box>
);

export const AcceptInvitation = () => {
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const [acceptInvitation, { error, isSuccess, isError }] =
    useLazyAcceptInvitationQuery();
  const navigate = useNavigate();

  const token = queryParameters.get("invitationToken");
  const existed = queryParameters.get("existed");
  const receivedEmail = queryParameters.get("email")!;
  const workspaceName = queryParameters.get("workspace");
  const workspaceImage = queryParameters.get("workspaceImage");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiErrorData = (error as any)?.data;

  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    dob?: string;
    address?: string;
    password?: string;
  }>({});

  const acceptInvitationHandler = async (form?: UserForm) => {
    setErrors({});
    if (!token) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...data } = { ...form, token };
    acceptInvitation(data);
  };

  useEffect(() => {
    apiErrorData?.errors?.map(
      (err: { property: string; constraints: string[] }) => {
        setErrors((prev) => ({ ...prev, [err.property]: err.constraints[0] }));
      }
    );
  }, [isError, error, apiErrorData?.errors]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/login");
    }
  }, [isSuccess, navigate]);

  if (apiErrorData?.message) {
    return (
      <ErrorBlock>
        <Grid2>
          <ErrorTypography variant="h5">
            {apiErrorData?.message}
          </ErrorTypography>
          <Button variant="contained" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        </Grid2>
      </ErrorBlock>
    );
  }
  return (
    <Box
      sx={{
        height: "calc(100vh - 96px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {existed === "true" ? (
        <Card>
          <Invitation
            workspaceImage={workspaceImage!}
            workspaceName={workspaceName!}
          />

          <Button variant="contained" onClick={() => acceptInvitationHandler()}>
            {t("buttons.accept")}
          </Button>
        </Card>
      ) : (
        <UserData
          confirm={acceptInvitationHandler}
          type="invite"
          workspaceName={workspaceName!}
          workspaceImage={workspaceImage!}
          errors={errors}
          prefilled={{ email: receivedEmail }}
        />
      )}
    </Box>
  );
};
