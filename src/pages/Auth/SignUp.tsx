import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  UserData,
  UserProduct,
  Workspace,
  SubscriptionForm,
  type UserForm,
  type WorkspaceForm,
} from "./Wizard";

import transitionsStyles from "./Wizard/transitions.module.scss";
import { useRegisterMutation } from "@api";
import { AUTH_TOKEN, REFRESH_TOKEN, useLocalStorage } from "@hooks";
import { convertFileToBase64 } from "@utils";
import { AuthContainer } from "../../components/AuthContainer";


export const SignUp = () => {
  const stripePromise = loadStripe("your-publishable-key-here");
  const [user, setUser] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    surname: "",
    secondName: "",
    phone: "+380",
    birthDate: "",
  });
  const [workspace, setWorkspace] = useState<WorkspaceForm>({
    name: "",
    description: "",
  });
  const [workspaceImage, setWorkspaceImage] = useState<File>();
  const [product, setProduct] = useState("");
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
      product,
      workspaceImage: imageBase64,
    });
  };

  return (
    <AuthContainer>
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
        <UserProduct
          hashKey={"userProduct"}
          stepName="userProduct"
          product={product}
          onUpdate={(value: string) => setProduct(value)}
          onSubmit={onSubmit}
        />
        <Elements stripe={stripePromise}>
          <SubscriptionForm />
        </Elements>
      </StepWizard>
    </AuthContainer>
  );
};
