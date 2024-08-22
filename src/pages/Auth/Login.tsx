import { ChangeEvent, useState, useEffect } from "react";
import {
  useLoginMutation,
  LOGIN_CACHE_KEY,
  useLazyLoginWithGoogleQuery,
} from "@api";
import { useLocalStorage, AUTH_TOKEN, REFRESH_TOKEN } from "@hooks";

export const Login = () => {
  const [userForm, setUserForm] = useState({ login: "", password: "" });
  const [, setAuthToken] = useLocalStorage(AUTH_TOKEN);
  const [, setRefresh] = useLocalStorage(REFRESH_TOKEN);
  const [, setUser] = useLocalStorage("user");
  const [login, { data, status }] = useLoginMutation({
    fixedCacheKey: LOGIN_CACHE_KEY,
  });
  const [loginWithGoogle, { data: googleRedirectUrl, status: googleStatus }] =
    useLazyLoginWithGoogleQuery();

  useEffect(() => {
    if (data && status === "fulfilled") {
      setAuthToken(data.authToken);
      setRefresh(data.refreshToken);
      setUser(data.user);
    }
  }, [data, setAuthToken, setRefresh, setUser, status]);

  useEffect(() => {
    if (googleRedirectUrl && googleStatus === "fulfilled") {
      window.location.href = googleRedirectUrl;
    }
  }, [googleStatus, googleRedirectUrl]);

  const signInInputs = [
    {
      id: "login",
      label: "Login",
      type: "text",
      placeholder: "Login",
      value: userForm.login,
      onChange: (ev: ChangeEvent<HTMLInputElement>) =>
        setUserForm((prevState) => ({ ...prevState, login: ev.target.value })),
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: userForm.password,
      onChange: (ev: ChangeEvent<HTMLInputElement>) =>
        setUserForm((prevState) => ({
          ...prevState,
          password: ev.target.value,
        })),
    },
  ];

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(userForm);
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
      <div className="auth__form__login__submit">
        <button className="btn btn-light" onClick={() => loginWithGoogle()}>
          Sign In with google
        </button>
      </div>
    </div>
  );
};
