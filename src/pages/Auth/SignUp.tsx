import { useEffect, useState, type FormEvent } from "react";
import StepWizard from "react-step-wizard";

import {
  UserData,
  UserProduct,
  Workspace,
  ConfirmRegister,
  type WorkspaceForm,
} from "./Wizard";

import type { UserForm } from "@types";

import transitionsStyles from "./Wizard/transitions.module.scss";
import { useRegisterMutation } from "@api";
import { WORKSPACE, useLocalStorage, useAuth } from "@hooks";
import { AuthContainer } from "@elements";
import { Product } from "@types";
import { useNavigate } from "react-router-dom";

const transitions = {
  enterRight: `${transitionsStyles.animated} ${transitionsStyles.enterRight}`,
  enterLeft: `${transitionsStyles.animated} ${transitionsStyles.enterLeft}`,
  exitRight: `${transitionsStyles.animated} ${transitionsStyles.exitRight}`,
  exitLeft: `${transitionsStyles.animated} ${transitionsStyles.exitLeft}`,
  intro: `${transitionsStyles.animated} ${transitionsStyles.intro}`,
};

export const SignUp = () => {
  const [, setWorkspaceId] = useLocalStorage(WORKSPACE, null);
  const [user, setUser] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    surname: "",
    secondName: "",
    phone: "+380",
    dob: "",
    address: "",
  });
  const [workspace, setWorkspace] = useState<WorkspaceForm>({
    name: "",
    description: "",
  });
  const [workspaceImage, setWorkspaceImage] = useState<File>();
  const [product, setProduct] = useState<Product | undefined>();

  const [register, { data, status }] = useRegisterMutation();
  const auth = useAuth();
  const navigate = useNavigate();

  const confirmRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;

    register({
      workspace,
      user: { ...user, phone: user.phone.replace(/\s/g, "") },
      productId: product.productId,
      priceId: product.prices[0].priceId,
      workspaceImage,
    });
  };

  const confirmUserForm = (form: UserForm) => {
    setUser((prevState) => ({ ...prevState, ...form }));
  };

  useEffect(() => {
    if (status === "fulfilled" && !auth.isLoggedIn) {
      auth.login(data);
      setWorkspaceId(data.workspace._id);
      navigate("/app/checkout");
    }
  }, [auth, data, navigate, setWorkspaceId, status]);

  return (
    <AuthContainer>
      <StepWizard transitions={transitions}>
        <UserProduct
          hashKey={"userProduct"}
          stepName="userProduct"
          onProductSelect={(value: Product) => setProduct(value)}
        />
        <UserData
          stepName="userData"
          hashKey={"userData"}
          confirm={confirmUserForm}
          type="signUp"
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
        {product ? (
          <ConfirmRegister
            user={user}
            workspace={workspace}
            product={product}
            confirmRegister={confirmRegister}
          />
        ) : (
          <></>
        )}
      </StepWizard>
    </AuthContainer>
  );
};
