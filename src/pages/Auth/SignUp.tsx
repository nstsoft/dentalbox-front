import { useEffect, useState, type FormEvent } from "react";

import {
  UserData,
  UserProduct,
  Workspace,
  ConfirmRegister,
  type WorkspaceForm,
} from "./Wizard";

import type { Sex, UserForm } from "@types";

import { useRegisterMutation } from "@api";
import { useLocalStorage, useAuth } from "@hooks";
import { AuthContainer } from "@elements";
import { Product } from "@types";
import { useNavigate } from "react-router-dom";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useTranslation } from "react-i18next";
import { WORKSPACE } from "@utils";

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
    sex: "male" as Sex,
  });
  const [workspace, setWorkspace] = useState<WorkspaceForm>({
    name: "",
    description: "",
    image: "",
  });
  const [workspaceImage, setWorkspaceImage] = useState<File>();
  const [product, setProduct] = useState<Product | undefined>();

  const [register, { data, status }] = useRegisterMutation();
  const auth = useAuth();
  const navigate = useNavigate();
  const [isStepperActive, setIsStepperActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation("", { keyPrefix: "signUpWizard.steps" });
  const steps = [t("userData"), t("workspace"), t("confirmRegister")];

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

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (status === "fulfilled" && !auth.isLoggedIn) {
      auth.login(data);
      setWorkspaceId(data.workspace._id);
      navigate("/app/checkout");
    }
  }, [auth, data, navigate, setWorkspaceId, status]);

  const stepsSet = [
    <UserData
      userData={user}
      confirm={confirmUserForm}
      type="signUp"
      nextStep={handleNext}
      previousStep={() => setIsStepperActive(false)}
    />,
    <Workspace
      workspaceForm={workspace}
      onUpdate={(value: {
        name?: string;
        description?: string;
        image?: string;
      }) => {
        setWorkspace((prevState) => ({ ...prevState, ...value }));
      }}
      setWorkspaceImage={setWorkspaceImage}
      nextStep={handleNext}
      previousStep={handleBack}
    />,
    product && (
      <ConfirmRegister
        user={user}
        workspace={workspace}
        product={product}
        confirmRegister={confirmRegister}
        previousStep={handleBack}
      />
    ),
  ];

  return (
    <AuthContainer>
      {!isStepperActive ? (
        <UserProduct
          onProductSelect={(value: Product) => {
            setProduct(value);
            setIsStepperActive(true);
          }}
        />
      ) : (
        <>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};

              if (index < activeStep) {
                stepProps.completed = true;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {stepsSet[activeStep]}
        </>
      )}
    </AuthContainer>
  );
};
