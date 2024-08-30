import { FormEvent, useState, useEffect } from "react";
import {
  useLoginMutation,
  LOGIN_CACHE_KEY,
  useLazyLoginWithGoogleQuery,
} from "@api";
import { useLocalStorage, AUTH_TOKEN, REFRESH_TOKEN } from "@hooks";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  Divider,
  FormControl,
  Link,
  TextField,
  Typography,
  FormLabel,
} from "@mui/material";
import { GoogleIcon } from "@assets";
import { ForgotPassword } from "./components";
import { SignInContainer, Card } from "@components";
import { validateLogin } from "@utils";

export const Login = () => {
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  const [, setAuthToken] = useLocalStorage(AUTH_TOKEN);
  const [, setRefresh] = useLocalStorage(REFRESH_TOKEN);
  const [, setUser] = useLocalStorage("user");
  const [login, { data, status }] = useLoginMutation({
    fixedCacheKey: LOGIN_CACHE_KEY,
  });
  const [loginWithGoogle, { data: googleRedirectUrl, status: googleStatus }] =
    useLazyLoginWithGoogleQuery();
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateLogin(loginForm.login)) {
      setEmailError(null);
    } else {
      setEmailError("Please enter a valid email address.");
    }
    if (loginForm.password.length >= 6) {
      setPasswordError(null);
    } else {
      setPasswordError("Password must be at least 6 characters long.");
    }

    if (!passwordError && !emailError) {
      login(loginForm);
    }
  };

  return (
    <section className="page">
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Login</FormLabel>
              <TextField
                error={!!emailError}
                helperText={emailError}
                id="login"
                type="email"
                name="email"
                placeholder="Your email or phone"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                onChange={(el) => {
                  setLoginForm((prev) => ({ ...prev, login: el.target.value }));
                }}
                value={loginForm.login}
                variant="outlined"
                color={emailError ? "error" : "primary"}
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setOpen(true);
                  }}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                error={!!passwordError}
                helperText={passwordError}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(el) =>
                  setLoginForm((p) => ({ ...p, password: el.target.value }))
                }
                value={loginForm.password}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <ForgotPassword open={open} handleClose={() => setOpen(false)} />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?
              <span>
                <Link
                  href="/material-ui/getting-started/templates/sign-in/"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => loginWithGoogle()}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </Box>
        </Card>
      </SignInContainer>

      {/* <form key="login__form" className="auth__form__login" onSubmit={onSubmit}>
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
              {t("loginPage.signIn")}
            </button>
          </div>
        </div>
      </form>
      <div className="auth__form__login__submit">
        <button className="btn btn-light" onClick={() => loginWithGoogle()}>
          {t("loginPage.signInGoogle")}
        </button>
      </div> */}
    </section>
  );
};
