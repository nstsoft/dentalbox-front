import { useGetPlansQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";

import "../auth.scss";
import { useTranslation } from "react-i18next";

interface IUserWorkspaceStepProps {
  plan: string;
  onUpdate: (value: string) => void;
  onSubmit: () => void;
}

export const UserPlan = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { plan, onUpdate, onSubmit, previousStep, isActive } = props;
  const { data, status } = useGetPlansQuery();
  const { t } = useTranslation();

  return (
    <form className="auth__form__cabinet" onSubmit={onSubmit}>
      <div className="form-row">
        <h3>{t("signUpWizard.userPlan.title")}</h3>
        <div className="d-flex justify-content-between">
          {isActive &&
            data &&
            data.map((availablePlan) => (
              <div
                className={`col-sm-5 mb-2 mr-2 ml-2 bg-white p-2 rounded text-center ${
                  availablePlan._id === plan && "active"
                }`}
                onClick={() => onUpdate(availablePlan._id)}
                key={availablePlan._id}
              >
                {availablePlan.name}
              </div>
            ))}
        </div>
        <div className="col-sm-12 mt-4 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-info auth__form__cabinet__submit"
            onClick={previousStep}
          >
            {t("signUpWizard.previousButton")}
          </button>
          <button
            type="button"
            className="btn btn-info auth__form__cabinet__submit"
            onClick={() => plan && onSubmit()}
          >
            {t("signUpWizard.userPlan.createAccount")}
          </button>
        </div>
      </div>
    </form>
  );
};
