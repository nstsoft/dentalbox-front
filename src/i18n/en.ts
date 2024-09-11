import { ResourceLanguage } from "i18next";

export const EN: ResourceLanguage = {
  translation: {
    buttons: {
      cancel: "Cancel",
      next: "Next",
      back: "Back",
      close: "Close",
      submit: "Submit",
      resendOtp: "Resend otp",
      login: "Login",
      signUp: "Sign Up",
      select: "Select"
    },
    login: {
      login: "Login",
      loginPlaceholder: "Your email or phone number",
      passwordPlaceholder: "Password",
      forgotPassword: "Forgot Password?",
      loginError:
        "Please enter a valid email address or phone number in the correct format.",
      passwordError: "Password must be at least 6 characters long.",
      password: "Password",
      signIn: "Sign In",
      or: "or",
      dontHaveAccount: "Don't have an account?",
      signUp: "Sign Up?",
      signInGoogle: "Sign In with Google",
      resetPassword: "Reset Password",
      resetPasswordText:
        "Enter your account's email address, and we'll send you a link to reset your password.",
      email: "Email",
      invalidCredentials: "Invalid login or password",
    },
    selectWorkspace: {
      workspaces: "Your Workspaces",
      selectWorkspaceTest:
        "Which workspace would you like to access? Please select one.",
    },
    confirmOtp: {
      confirmOtp: "Confirm OTP Code",
      confirmOtpText:
        "To maintain access to the management platform and ensure your account's security, please verify your OTP code. This step is necessary to confirm your identity and continue using all the platform's features.",
    },
    navbar: {
      signIn: "Sign In",
      createCabinet: "Create Cabinet",
    },
    signUpWizard: {
      userData: {
        title: "User Data",
        name: "Name",
        surname: "Surname",
        secondName: "Second Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        phone: "Phone",
        birthDate: "Birth Date",
      },
      workspace: {
        title: "Workspace Data",
        name: "Workspace Name",
        image: "Workspace Image",
        description: "Workspace Description",
      },
      userProduct: {
        title: "User Product",
        intervals: {
          week: 'Week',
          month: 'Month',
          year: 'Year',
        },
        people: 'people'
      },
      subscriptionForm: {
        title: "Subscription Form",
      }
    },
    header: {
      profile: "Profile",
      dashboard: "Dashboard",
      workspace: "workspace",
      logout: "Logout",
    },
  },
};
