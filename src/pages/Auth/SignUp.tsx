import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";

import { UserData, UserPlan, Workspace } from "./Wizard";

import transitionsStyles from "./Wizard/transitions.module.scss";
import { useRegisterMutation } from "@api";
import { AUTH_TOKEN, REFRESH_TOKEN, useLocalStorage } from "@hooks";

export const SignUp = () => {
  const [state, setState] = useState({
    user: {
      name: "",
      email: "",
      password: "",
      surname: "",
      secondName: "",
    },
    workspace: {
      name: "",
      description: "",
    },
    plan: "",
  });
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

  const updateForm = (stateKey: string, value: string, key?: string) => {
    const newState = { ...state };

    if (key) {
      newState[stateKey][key] = value;
    } else {
      newState[stateKey] = value;
    }
    setState({
      ...newState,
    });
  };

  const onSubmit = async () => {
    try {
      register(state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StepWizard transitions={transitions}>
      <UserData
        stepName="userData"
        userForm={state.user}
        onUpdate={updateForm}
      />
      <Workspace
        stepName="workspace"
        workspaceForm={state.workspace}
        onUpdate={updateForm}
      />
      <UserPlan
        stepName="userPlan"
        plan={state.plan}
        onUpdate={updateForm}
        onSubmit={onSubmit}
      />
    </StepWizard>
  );
};
