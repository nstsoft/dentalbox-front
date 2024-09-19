import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#008fba" },
    secondary: { main: "#7adb30" },
    error: { main: "#f44336" },
    // text: {
    //   primary: "#757575",
    //   secondary: "#008fba",
    //   disabled: "#b0b0b0",
    // },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
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
          color: "#757575",
          "& .MuiListItemIcon-root": {
            color: "#757575",
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
        },
      },
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "2rem",
      "@media (max-width:600px)": { fontSize: "2.5rem" },
      "@media (max-width:960px)": { fontSize: "3rem" },
    },
    h4: {
      fontSize: "2rem",
      "@media (max-width:600px)": { fontSize: "1.5rem" },
      // "@media (min-width:960px)": { fontSize: "2rem" },
    },
    h5: {
      fontSize: "1.8rem",
      "@media (max-width:600px)": { fontSize: "1.2rem" },
      // "@media (min-width:960px)": { fontSize: "2rem" },
    },
    h6: {
      fontSize: "1.2rem",
      "@media (max-width:600px)": { fontSize: "0.9rem" },
      // "@media (min-width:960px)": { fontSize: "2rem" },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:600px)": { fontSize: "0.8rem" },
      "@media (max-width:960px)": { fontSize: "0.9rem" },
    },
    body2: {
      fontSize: "0.875rem",
      "@media (max-width:600px)": { fontSize: "0.95rem" },
      "@media (max-width:960px)": { fontSize: "1rem" },
    },
  },
});

export default theme;
