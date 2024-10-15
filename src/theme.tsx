import { createTheme } from "@mui/material/styles";

const commonGrey = "#757575";

const theme = createTheme({
  palette: {
    primary: { main: "#008fba" },
    secondary: { main: "#7adb30" },
    error: { main: "#f44336" },
    warning: { main: "#f38a4a" },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    grey: {
      50: "#44444412",
      100: commonGrey,
    },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 } },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter regular", sans-serif',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: commonGrey,
          "& .MuiListItemIcon-root": {
            color: commonGrey,
          },
          "&.Mui-selected": {
            color: "#008fba",
            backgroundColor: "#b2ebf2",
            "& .MuiListItemIcon-root": {
              color: "#008fba",
            },
            "&:hover": {
              backgroundColor: "#b2ebf2",
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.highlighted": { color: "#008fba" },
          "& .MuiSvgIcon-root": {
            color: "#008fba",
          },
        },
      },
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "2rem",
      xs: { fontSize: "2.5rem" },
      sm: { fontSize: "3rem" },
    },
    h2: {
      fontSize: "1.8rem",
      xs: { fontSize: "2.1rem" },
      sm: { fontSize: "2.3rem" },
    },
    h3: {
      fontSize: "1.7rem",
      xs: { fontSize: "2rem" },
      sm: { fontSize: "2.1rem" },
    },
    h4: {
      fontSize: "1.5rem",
      xs: { fontSize: "1.8rem" },
      sm: { fontSize: "2.0rem" },
    },
    h5: {
      fontSize: "1.3rem",
      xs: { fontSize: "1.5rem" },
      sm: { fontSize: "1.8rem" },
    },
    h6: {
      fontSize: "1.2rem",
      xs: { fontSize: "1.4rem" },
      sm: { fontSize: "1.6rem" },
    },
    body1: {
      fontSize: "0.9rem",
      xs: { fontSize: "0.95rem" },
      sm: { fontSize: "1rem" },
    },
    body2: {
      fontSize: "0.875rem",
      xs: { fontSize: "0.95rem" },
      sm: { fontSize: "1rem" },
    },
  },
});

export default theme;
