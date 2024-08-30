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
  InputAdornment,
  IconButton,
  Input,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { GoogleIcon } from "@assets";
import { ForgotPassword } from "./components";
import { AuthContainer, Card } from "@components";
import { validateLogin } from "@utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const { t, i18n } = useTranslation("", { keyPrefix: "loginPage" });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data && status === "fulfilled") {
      setAuthToken(data.authToken);
      setRefresh(data.refreshToken);
      setUser(data.user);
    }
  }, [data, setAuthToken, setRefresh, setUser, status]);

  useEffect(() => {
    i18n.changeLanguage("ua");
  });

  useEffect(() => {
    if (googleRedirectUrl && googleStatus === "fulfilled") {
      window.location.href = googleRedirectUrl;
    }
  }, [googleStatus, googleRedirectUrl]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateLogin(loginForm.login)) {
      setLoginError(null);
    } else {
      setLoginError(t("loginError"));
    }
    if (loginForm.password.length >= 6) {
      setPasswordError(null);
    } else {
      setPasswordError(t("passwordError"));
    }

    if (!passwordError && !loginError) {
      login(loginForm);
    }
  };

  return (
    <section className="page">
      <AuthContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {t("signIn")}
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
              <InputLabel htmlFor="login">{t("login")}</InputLabel>
              <OutlinedInput
                error={!!loginError}
                id="outlined-login"
                type="text"
                onChange={(el) =>
                  setLoginForm((p) => ({ ...p, login: el.target.value }))
                }
                value={loginForm.login}
                color={loginError ? "error" : "primary"}
                name="login"
                label="login"
              />
              <FormHelperText error={!!loginError}>{loginError}</FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">{t("password")}</InputLabel>
              <OutlinedInput
                error={!!passwordError}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(el) =>
                  setLoginForm((p) => ({ ...p, password: el.target.value }))
                }
                value={loginForm.password}
                color={passwordError ? "error" : "primary"}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText error={!!passwordError}>
                {passwordError}
              </FormHelperText>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Link
                  component="button"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setOpen(true);
                  }}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  {t("forgotPassword")}
                </Link>
              </Box>
            </FormControl>
            <ForgotPassword open={open} handleClose={() => setOpen(false)} />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              {t("dontHaveAccount")}{" "}
              <span>
                <Link
                  href="/material-ui/getting-started/templates/sign-in/"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  {t("signUp")}
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>{t("or")}</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => loginWithGoogle()}
              startIcon={<GoogleIcon />}
            >
              {t("signInGoogle")}
            </Button>
          </Box>
        </Card>
      </AuthContainer>

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
              {t("signIn")}
            </button>
          </div>
        </div>
      </form>
      <div className="auth__form__login__submit">
        <button className="btn btn-light" onClick={() => loginWithGoogle()}>
          {t("signInGoogle")}
        </button>
      </div> */}
    </section>
  );
};
