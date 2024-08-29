import { ChangeEvent, FormEvent } from "react";
import { StepWizardChildProps } from "react-step-wizard";
import type { UserForm } from "./types";
import { useTranslation } from "react-i18next";

interface IUserDataStepProps {
  userForm: UserForm;
  onUpdate: (data: Partial<UserForm>) => void;
}

export const UserData = (
  props: IUserDataStepProps & Partial<StepWizardChildProps>
) => {
  const { userForm, onUpdate, nextStep } = props;
  const { t } = useTranslation();

  const signUpInputs = [
    {
      id: "name",
      label: t("signUpWizard.userData.name"),
      type: "text",
      placeholder: t("signUpWizard.userData.name"),
      value: userForm.name,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ name: ev.target.value });
      },
    },
    {
      id: "surname",
      label: t("signUpWizard.userData.surname"),
      type: "text",
      placeholder: t("signUpWizard.userData.surname"),
      value: userForm.surname,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ surname: ev.target.value });
      },
    },
    {
      id: "secondName",
      label: t("signUpWizard.userData.secondName"),
      type: "text",
      placeholder: t("signUpWizard.userData.secondName"),
      value: userForm.secondName,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ secondName: ev.target.value });
      },
    },
    {
      id: "email",
      label: t("signUpWizard.userData.email"),
      type: "email",
      placeholder: t("signUpWizard.userData.email"),
      value: userForm.email,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ email: ev.target.value });
      },
    },
    {
      id: "password",
      label: t("signUpWizard.userData.password"),
      type: "password",
      placeholder: t("signUpWizard.userData.password"),
      value: userForm.password,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ password: ev.target.value });
      },
    },
  ];

  const onNext = (event: FormEvent) => {
    event.preventDefault();

    if (userForm.name && userForm.email && userForm.password) {
      nextStep?.();
    }
  };

  return (
    <form className="auth__form__cabinet">
      <div className="form-row">
        {signUpInputs.map((input) => (
          <div className="form-group col-sm-6 mb-2 w-100" key={input.id}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              id={input.id}
              className="form-control"
              type={input.type}
              required
              value={input.value}
              onChange={input.onChange}
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <div className="form-group col-sm-12 mt-4 d-flex justify-content-end">
          <button
            className="btn btn-info auth__form__cabinet__submit"
            onClick={onNext}
          >
            {t("signUpWizard.nextButton")}
          </button>
        </div>
      </div>
    </form>
  );
};
