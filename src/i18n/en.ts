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
      select: "Select",
      returnToLogin: "Back to Login",
      applyFilter: "Apply filter",
      accept: "Accept",
      create: "Create",
      upload: "Upload",
      save: "Save",
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
      authenticationErrorHeader: "Authentication Error",
      authenticationErrorText:
        "We’re having trouble verifying your credentials. Please check your username and password and try again. If you continue to experience issues, you might need to reset your password or contact support for assistance.",
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
        address: "Address",
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
          week: "Week",
          month: "Month",
          year: "Year",
        },
        people: "people",
      },
      subscriptionForm: {
        title: "Subscription Form",
      },
      packageIntervals: {
        week: "Weekly  package",
        month: "Monthly  package",
        year: "Annual  package",
      },
    },
    header: {
      profile: "Profile",
      dashboard: "Dashboard",
      workspace: "workspace",
      logout: "Logout",
    },
    confirmRegister: {
      userData: "User data",
      dob: "Date of  birth",
      phone: "Phone",
      email: "Email",
      name: "Name",
      secondName: "Second Name",
      surname: "Surname",
      role: "Role",
      owner: "Account Owner",
      workspaceData: "Workspace data",
      workspaceName: "Workspace name",
      workspaceDescription: "Workspace description",
      checkbox: "I agree to the terms and conditions",
      acceptTos: "Please accept the TOS",
    },
    sideMenu: {
      pages: {
        workspace: "Workspace",
        cabinets: "Cabinets",
        calendar: "Calendar",
        staff: "Staff",
        profile: "Profile",
        patients: "Patients",
      },
    },
    pages: {
      workspace: {
        workspace: "Workspace",
        stuff: "Stuff",
        address: "Address",
        phone: "Phone",
        notes: "Notes",
        currentStaff: "Current staff",
        maxStaff: "Maximum stuff",
        addStaff: "Add stuff",

        subscription: "Subscription",
        package: "Package",
        price: "Price",
        description: "Description",
        status: "Status",
        subscriptionStatus: {
          active: "Active",
          canceled: "Canceled",
          incomplete: "Incomplete",
          incomplete_expired: "Incomplete Expired",
          past_due: "Past Due",
          paused: "Paused",
          trialing: "Trialing",
          unpaid: "Unpaid",
        },
        interval: { week: "Weekly", month: "Monthly", year: "Annual" },
        period: "Period",
        cancel: "Cancel",
        pause: "Pause",
        paymentsSection: {
          payments: "Payment methods",
          default: "Default card",
          delete: "Remove card",
          makeDefault: "Make default",
        },
        popover: {
          email: "Email",
          role: "Role",
        },
        roleItems: {
          admin: "Admin",
          manager: "Manager",
          doctor: "Doctor",
          assistant: "Assistant",
          owner: "Owner",
        },
        tabs: {
          workspace: "Workspace",
          subscription: "Subscription",
          paymentMethods: "Payment methods",
          invoices: "Invoices",
        },
        paymentMethods: {
          confirmDeleteLabel:
            "Are you sure you want to remove this payment method?",
          setDefault: "Make default",
          addCardLabel: "Add a new payment method",
        },
      },
      staff: {
        staff: "Stuff",
        search: "Search",
        isVerified: "Is verified",
        roles: "Roles",
        roleItems: {
          admin: "Admin",
          manager: "Manager",
          doctor: "Doctor",
          assistant: "Assistant",
          owner: "Owner",
        },
        invitationStatuses: {
          pending: "Pending",
          accepted: "Accepted",
          declined: "Declined",
          expired: "Expired",
        },
        verifiedItems: { verified: "Yes", notVerified: "No" },
        verification: "Is verified",
        email: "Email",
        name: "Name",
        secondName: "Second Name",
        surname: "Surname",
        phone: "Phone",
        dob: "Date of birth",
        address: "Address",
        status: "Status",
        activeTill: "Active till",
        invitations: "Invitations",
      },
      cabinet: {
        cabinet: "Cabinet",
        name: "Name",
        phone: "Phone",
        address: "Address",
        notes: "Notes",
        actions: "Actions",
        createCabinet: "Create cabinet",
        chair: "Chair",
        image: "Image",
      },
      patient: {
        patient: "Patient",
        name: "Name",
        secondName: "Second Name",
        surname: "Surname",
        dob: "Date of birth",
        email: "Email",
        phone: "Phone",
        address: "Address",
        createPatient: "Create patient",
        image: "Image",
        imageSuccess: "Image successfully uploaded",
        sex: "Sex",
        sexItems: { male: "Male", female: "Female" },
      },
      patientCard: {
        patientCard: "Patient Card",
        name: "Name",
        secondName: "Second Name",
        surname: "Surname",
        dob: "Date of birth",
        phone: "Phone",
        email: "Email",
        address: "Address",
        notes: "Notes",
        sex: "Sex",
        sexItems: { male: "Male", female: "Female" },
      },
      calendar: {
        messages: {
          today: "Today",
          previous: "Previous",
          next: "Next",
          month: "Month",
          week: "Week",
          day: "Day",
          agenda: "Agenda",
          date: "Date",
          time: "Date",
          event: "Event",
        },
      },
    },
  },
};
