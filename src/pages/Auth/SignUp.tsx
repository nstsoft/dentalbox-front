import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  UserData,
  UserProduct,
  Workspace,
  CheckoutForm,
  type UserForm,
  type WorkspaceForm,
} from "./Wizard";

import transitionsStyles from "./Wizard/transitions.module.scss";
import { useRegisterMutation } from "@api";
import { AUTH_TOKEN, REFRESH_TOKEN, useLocalStorage } from "@hooks";
import { AuthContainer } from "@components";
import { Product } from "@types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const transitions = {
  enterRight: `${transitionsStyles.animated} ${transitionsStyles.enterRight}`,
  enterLeft: `${transitionsStyles.animated} ${transitionsStyles.enterLeft}`,
  exitRight: `${transitionsStyles.animated} ${transitionsStyles.exitRight}`,
  exitLeft: `${transitionsStyles.animated} ${transitionsStyles.exitLeft}`,
  intro: `${transitionsStyles.animated} ${transitionsStyles.intro}`,
};

export const SignUp = () => {
  const [user, setUser] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    surname: "",
    secondName: "",
    phone: "+380",
    dob: "",
  });
  const [workspace, setWorkspace] = useState<WorkspaceForm>({
    name: "",
    description: "",
  });
  const [workspaceImage, setWorkspaceImage] = useState<File>();
  const [product, setProduct] = useState<Product | null>(null);

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
          onUpdate={(value: Product) => setProduct(value)}
        />
        {product ? (
          <Elements
            stripe={stripePromise}
            options={{
              locale: "ru",
              mode: "subscription",
              // amount: product?.prices[0].amount,
              // currency: product?.prices[0].currency,
              appearance: { labels: "above", theme: "stripe" },
            }}
          >
            <CheckoutForm
              user={user}
              workspace={workspace}
              workspaceImage={workspaceImage}
              product={product}
            />
          </Elements>
        ) : (
          <></>
        )}
      </StepWizard>
    </AuthContainer>
  );
};
