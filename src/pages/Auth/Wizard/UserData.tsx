import { ChangeEvent, FormEvent } from "react";
import { StepWizardChildProps } from "react-step-wizard";
import { UserRequest } from "../../../interfaces";

interface IUserDataStepProps {
  userForm: UserRequest;
  onUpdate: (stateKey: string, value: string, key?: string) => void;
}

export const UserData = (props: IUserDataStepProps & StepWizardChildProps) => {
  const { userForm, onUpdate, nextStep } = props;

  const signUpInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Name",
      value: userForm.name,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate("user", ev.target.value, "name");
      },
    },
    {
      id: "surname",
      label: "Sur Name",
      type: "text",
      placeholder: "Sur Name",
      value: userForm.surname,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate("user", ev.target.value, "surname");
      },
    },
    {
      id: "secondName",
      label: "Second Name",
      type: "text",
      placeholder: "Second Name",
      value: userForm.secondName,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate("user", ev.target.value, "secondName");
      },
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      value: userForm.email,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate("user", ev.target.value, "email");
      },
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: userForm.password,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate("user", ev.target.value, "password");
      },
    },
  ];

  const onNext = (event: FormEvent) => {
    if (userForm.name && userForm.email && userForm.password) {
      event.preventDefault();

      nextStep();
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
            Next
          </button>
        </div>
      </div>
    </form>
  );
};
