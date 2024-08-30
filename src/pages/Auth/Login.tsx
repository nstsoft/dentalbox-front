import { FormEvent, useState, useEffect } from "react";
import {
  useLoginMutation,
  LOGIN_CACHE_KEY,
  useLazyLoginWithGoogleQuery,
} from "@api";
import { useAuth } from "@hooks";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  Divider,
  FormControl,
  Link,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { GoogleIcon } from "@assets";
import { ForgotPassword } from "./components";
import { AuthContainer, Card } from "@components";
import { validateLogin } from "@utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  const auth = useAuth();
  const [login, { data, error, status }] = useLoginMutation({
    fixedCacheKey: LOGIN_CACHE_KEY,
  });
  const [loginWithGoogle, { data: googleRedirectUrl, status: googleStatus }] =
    useLazyLoginWithGoogleQuery();
  const { t } = useTranslation("", { keyPrefix: "login" });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoginError(null);
    setAuthError(null);
    setPasswordError(null);
  }, [loginForm]);

  useEffect(() => {
    if (data && status === "fulfilled") {
      auth.login(data);
      navigate("/app");
    }
  }, [data, status, error, auth, navigate]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    if (err) {
      const message =
        err?.data?.error?.statusCode == 401
          ? t("invalidCredentials")
          : err?.data;

      setAuthError(message);
    }
  }, [error, t]);

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
      <AuthContainer direction="row" justifyContent="space-around">
        <div style={{ maxWidth: "700px" }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            {" "}
            Welcome to Our Dental Management System{" "}
          </Typography>
          <Divider>{"!"}</Divider> <br></br>
          <Typography gutterBottom textAlign="center">
            Managing a dental practice has never been easier. Our comprehensive
            platform helps you streamline every aspect of your dental practice,
            from patient scheduling to billing and everything in between.
          </Typography>
          <Typography variant="h6" gutterBottom textAlign="left">
            Key Features:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Efficient Appointment Scheduling: Manage your appointments with an
            intuitive calendar that integrates seamlessly with your practice’s
            workflow. Reduce no-shows with automated reminders and optimize your
            schedule to maximize patient visits.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Comprehensive Patient Records: Keep all your patient information in
            one secure place. Our system allows you to easily access medical
            histories, treatment plans, and digital x-rays, ensuring every visit
            is smooth and personalized.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Automated Billing and Invoicing: Simplify your financial operations
            with automated billing and invoicing. Our system supports multiple
            payment methods, insurance claims processing, and provides real-time
            financial insights to help you manage your practice’s cash flow
            efficiently.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Patient Communication Tools: Enhance patient engagement with
            built-in communication tools. Send appointment reminders, follow-up
            care instructions, and health tips directly to your patients,
            helping to build stronger relationships and improve overall care.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Secure and Compliant: Our system is designed with security and
            compliance in mind. We ensure all patient data is protected with
            state-of-the-art encryption and comply with all relevant healthcare
            regulations.
          </Typography>
          Join hundreds of dental professionals who trust our system to help
          them provide better care, improve practice efficiency, and grow their
          business. Log in to get started!
        </div>
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
              <FormHelperText error={true}>{authError}</FormHelperText>
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
              {t("signIn")}
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
    </section>
  );
};
