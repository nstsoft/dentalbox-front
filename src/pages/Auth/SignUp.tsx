import { ChangeEvent, useState } from "react";
import { useGetMeQuery } from "@api";

import { signUp } from "../../api";

export const SignUp = () => {
  const { data, status } = useGetMeQuery();
  console.log({ data, status });
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [workspaceData, setWorkspaceData] = useState({
    name: "",
    description: "",
  });

  const onSubmit = async () => {
    try {
      const user = await signUp(userForm, workspaceData);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signUpInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Name",
      value: userForm.name,
      onChange: (ev: ChangeEvent<HTMLInputElement>) =>
        setUserForm((prevState) => {
          return { ...prevState, name: ev.target.value };
        }),
    },
    {
      id: "login",
      label: "Email",
      type: "text",
      placeholder: "Email",
      value: userForm.email,
      onChange: (ev: ChangeEvent<HTMLInputElement>) =>
        setUserForm((prevState) => {
          return { ...prevState, email: ev.target.value };
        }),
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: userForm.password,
      onChange: (ev: ChangeEvent<HTMLInputElement>) =>
        setUserForm((prevState) => {
          return { ...prevState, password: ev.target.value };
        }),
    },
    {
      id: "workspaceName",
      label: "Workspace Name",
      type: "text",
      placeholder: "Workspace Name",
      value: workspaceData.name,
      onChange: (ev: ChangeEvent<HTMLInputElement>) =>
        setWorkspaceData((prevState) => {
          return { ...prevState, name: ev.target.value };
        }),
    },
    {
      id: "workspaceDesc",
      label: "Workspace Description",
      type: "text",
      placeholder: "Workspace Description",
      value: workspaceData.description,
      onChange: (ev: ChangeEvent<HTMLInputElement>) =>
        setWorkspaceData((prevState) => {
          return { ...prevState, description: ev.target.value };
        }),
    },
  ];

  return (
    <form className="auth__form__cabinet" onSubmit={onSubmit}>
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
        <div className="form-group col-sm-12 mt-4">
          <button
            type="submit"
            className="btn btn-info auth__form__cabinet__submit"
          >
            Create Cabinet
          </button>
        </div>
      </div>
    </form>
  );
};
