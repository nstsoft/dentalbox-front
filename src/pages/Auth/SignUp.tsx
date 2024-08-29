import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";

import { UserData, UserPlan, Workspace } from "./Wizard";

import transitionsStyles from "./Wizard/transitions.module.scss";
import { useRegisterMutation } from "@api";
import { AUTH_TOKEN, REFRESH_TOKEN, useLocalStorage } from "@hooks";

export const SignUp = () => {
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
    surname: "",
    secondName: "",
  });
  const [workspaceState, setWorkspaceState] = useState({
    name: "",
    description: "",
  });
  const [planState, setPlanState] = useState("");
  const transitions = {
    enterRight: `${transitionsStyles.animated} ${transitionsStyles.enterRight}`,
    enterLeft: `${transitionsStyles.animated} ${transitionsStyles.enterLeft}`,
    exitRight: `${transitionsStyles.animated} ${transitionsStyles.exitRight}`,
    exitLeft: `${transitionsStyles.animated} ${transitionsStyles.exitLeft}`,
    intro: `${transitionsStyles.animated} ${transitionsStyles.intro}`,
  };
  const [, setAuthToken] = useLocalStorage(AUTH_TOKEN);
  const [, setRefresh] = useLocalStorage(REFRESH_TOKEN);
  const [, setUser] = useLocalStorage("user");
  const [register, { data, status }] = useRegisterMutation();

  useEffect(() => {
    if (data && status === "fulfilled") {
      setAuthToken(data.authToken);
      setRefresh(data.refreshToken);
      setUser(data.user);
    }
  }, [data, setAuthToken, setRefresh, setUser, status]);

  const onSubmit = async () => {
    try {
      register({user: userState, workspace: workspaceState, plan: planState});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StepWizard transitions={transitions}>
      <UserData
        stepName="userData"
        userForm={userState}
        onUpdate={(key: string, value: string) =>
          setUserState((prevState) => ({ ...prevState, [key]: value }))
        }
      />
      <Workspace
        stepName="workspace"
        workspaceForm={workspaceState}
        onUpdate={(key: string, value: string) =>
          setWorkspaceState((prevState) => ({ ...prevState, [key]: value }))
        }
      />
      <UserPlan
        stepName="userPlan"
        plan={planState}
        onUpdate={(value: string) => setPlanState(value)}
        onSubmit={onSubmit}
      />
    </StepWizard>
  );
};
