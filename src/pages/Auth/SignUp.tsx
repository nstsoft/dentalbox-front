import { useEffect, useState, type FormEvent } from "react";
import StepWizard from "react-step-wizard";

import {
  UserData,
  UserProduct,
  Workspace,
  ConfirmRegister,
  type UserForm,
  type WorkspaceForm,
} from "./Wizard";

import transitionsStyles from "./Wizard/transitions.module.scss";
import { useRegisterMutation } from "@api";
import { WORKSPACE, useLocalStorage, useAuth } from "@hooks";
import { AuthContainer } from "@components";
import { Product } from "@types";
import { convertFileToBase64 } from "@utils";
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

    const imageBase64 =
      workspaceImage && (await convertFileToBase64(workspaceImage));

    register({
      workspace,
      user: { ...user, phone: user.phone.replace(/\s/g, "") },
      workspaceImage: imageBase64,
      productId: product.productId,
      priceId: product.prices[0].priceId,
    });
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
