import { ChangeEvent, FormEvent } from "react";
import { StepWizardChildProps } from "react-step-wizard";
import { WorkspaceForm } from "./types";

interface IUserWorkspaceStepProps {
  workspaceForm: WorkspaceForm;
  onUpdate: (data: Partial<WorkspaceForm>) => void;
  setWorkspaceImage: (file: File) => void;
}

export const Workspace = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { workspaceForm, onUpdate, nextStep, previousStep, setWorkspaceImage } =
    props;

  const signUpInputs = [
    {
      id: "workspaceName",
      label: "Workspace Name",
      type: "text",
      placeholder: "Workspace Name",
      required: true,
      value: workspaceForm.name,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ name: ev.target.value });
      },
    },
    {
      id: "description",
      label: "Workspace Description",
      type: "text",
      placeholder: "Workspace Description",
      required: false,
      value: workspaceForm.description,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ description: ev.target.value });
      },
    },
  ];

  const onNext = (event: FormEvent) => {
    event.preventDefault();

    if (workspaceForm.name) {
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
              required={input.required}
              value={input.value}
              onChange={input.onChange}
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <div className="mt-4">
          <label className="p-1">
            Upload image
            <input
              type="file"
              onChange={({ target }) => {
                target.files?.[0] && setWorkspaceImage(target.files?.[0]);
              }}
            />
          </label>
        </div>
        <div className="form-group col-sm-12 mt-4 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-info auth__form__cabinet__submit"
            onClick={previousStep}
          >
            Previous
          </button>
          <button
            className="btn btn-info auth__form__cabinet__submit"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};
