import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";

import {
  UserData,
  UserPlan,
  Workspace,
  type UserForm,
  type WorkspaceForm,
} from "./Wizard";

import transitionsStyles from "./Wizard/transitions.module.scss";
import { useRegisterMutation } from "@api";
import { AUTH_TOKEN, REFRESH_TOKEN, useLocalStorage } from "@hooks";
import { convertFileToBase64 } from "@utils";

export const SignUp = () => {
  const [user, setUser] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    surname: "",
    secondName: "",
  });
  const [workspace, setWorkspace] = useState<WorkspaceForm>({
    name: "",
    description: "",
  });
  const [workspaceImage, setWorkspaceImage] = useState<File>();
  const [plan, setPlan] = useState("");
  const transitions = {
    enterRight: `${transitionsStyles.animated} ${transitionsStyles.enterRight}`,
    enterLeft: `${transitionsStyles.animated} ${transitionsStyles.enterLeft}`,
    exitRight: `${transitionsStyles.animated} ${transitionsStyles.exitRight}`,
    exitLeft: `${transitionsStyles.animated} ${transitionsStyles.exitLeft}`,
    intro: `${transitionsStyles.animated} ${transitionsStyles.intro}`,
  };
  const [, setAuthToken] = useLocalStorage(AUTH_TOKEN);
  const [, setRefresh] = useLocalStorage(REFRESH_TOKEN);
  const [, setUserToStorage] = useLocalStorage("user");
  const [register, { data, status }] = useRegisterMutation();

  useEffect(() => {
    if (status === "fulfilled") {
      setAuthToken(data.authToken);
      setRefresh(data.refreshToken);
      setUserToStorage(data.user);
    }
  }, [data, setAuthToken, setRefresh, setUserToStorage, status]);

  const onSubmit = async () => {
    const imageBase64 =
      workspaceImage && (await convertFileToBase64(workspaceImage));
    register({
      user,
      workspace,
      plan,
      workspaceImage: imageBase64,
    });
  };

  return (
    <StepWizard transitions={transitions}>
      <UserData
        stepName="userData"
        hashKey={"userData"}
        userForm={user}
        onUpdate={(value: Partial<UserForm>) =>
          setUser((prevState) => ({ ...prevState, ...value }))
        }
      />
      <Workspace
        stepName="workspace"
        hashKey={"workspace"}
        workspaceForm={workspace}
        onUpdate={(value: {
          name?: string;
          description?: string;
          image?: null;
        }) => {
          setWorkspace((prevState) => ({ ...prevState, ...value }));
        }}
        setWorkspaceImage={setWorkspaceImage}
      />
      <UserPlan
        hashKey={"userPlan"}
        stepName="userPlan"
        plan={plan}
        onUpdate={(value: string) => setPlan(value)}
        onSubmit={onSubmit}
      />
    </StepWizard>
  );
};
