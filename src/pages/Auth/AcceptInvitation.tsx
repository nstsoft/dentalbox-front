import { FC, useState } from "react";
import { UserData } from "./Wizard";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazyAcceptInvitationQuery } from "@api";
import { Card } from "@elements";
import { useTranslation } from "react-i18next";

type InvitationProps = {
  workspaceName: string;
  workspaceImage: string;
};

export const Invitation: FC<InvitationProps> = ({
  workspaceName,
  workspaceImage,
}) => (
  <>
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Avatar
        src={workspaceImage ?? ""}
        alt={workspaceName ?? "workspace image"}
      />
      <Typography variant="h5">{workspaceName}</Typography>
    </Box>

    <Typography variant="body1">
      Please accept invitation from workspace {workspaceName}
    </Typography>
  </>
);

export const AcceptInvitation = () => {
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const [acceptInvitation] = useLazyAcceptInvitationQuery();
  const navigate = useNavigate();

  const invitationToken = queryParameters.get("invitationToken");
  const existed = queryParameters.get("existed");
  const receiverEmail = queryParameters.get("email")!;
  const workspaceName = queryParameters.get("workspace");
  const workspaceImage = queryParameters.get("workspaceImage");

  const [user, setUser] = useState({
    name: "",
    password: "",
    surname: "",
    secondName: "",
    phone: "+380",
    dob: "",
    address: "",
  });

  const isFormValid = user.name && user.surname && user.secondName && user.dob;

  const inviteUserHandler = async () => {
    try {
      if (existed === "true") {
        await acceptInvitation({ token: invitationToken! });
      } else {
        if (!isFormValid) return;
        await acceptInvitation({ ...user, token: invitationToken! });
      }

      navigate("/auth/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        pt: 2,
        pb: 2,
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

          <Button variant="contained" onClick={inviteUserHandler}>
            {t("buttons.accept")}
          </Button>
        </Card>
      ) : (
        <UserData
          userForm={{ ...user, email: receiverEmail }}
          onUpdate={(data) => setUser({ ...user, ...data })}
          onInvite={inviteUserHandler}
          type="invite"
          workspaceName={workspaceName!}
          workspaceImage={workspaceImage!}
        />
      )}
    </Box>
  );
};
