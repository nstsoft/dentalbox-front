import { useGetPlansQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";

import "../auth.scss";

interface IUserWorkspaceStepProps {
  plan: string;
  onUpdate: (value: string) => void;
  onSubmit: () => void;
}

export const UserPlan = (
  props: IUserWorkspaceStepProps & StepWizardChildProps
) => {
  const { plan, onUpdate, onSubmit, previousStep, isActive } = props;
  const { data, status } = useGetPlansQuery();

  const createAccount = () => {
    plan && onSubmit();
  };

  return (
    <form className="auth__form__cabinet" onSubmit={onSubmit}>
      <div className="form-row">
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
            Previous
          </button>
          <button
            type="button"
            className="btn btn-info auth__form__cabinet__submit"
            onClick={createAccount}
          >
            Create User
          </button>
        </div>
      </div>
    </form>
  );
};
