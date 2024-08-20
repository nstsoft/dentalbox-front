import { ChangeEvent, useState } from "react";
import { signIn } from "../../api";

export const Login = () => {
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const signInInputs = [
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
  ];

  const onSubmit = async () => {
    try {
      const user = await signIn(userForm.email, userForm.password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login_window__form main_forms">
      <form key="login__form" className="auth__form__login" onSubmit={onSubmit}>
        <div className="login-for-block">
          {signInInputs.map((input) => (
            <div className="my-1" key={input.id}>
              <label className="sr-only" htmlFor={input.id}>
                {input.label}
              </label>
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
          <div className="auth__form__login__submit">
            <button className="btn btn-light" type="submit">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
