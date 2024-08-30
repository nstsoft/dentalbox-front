import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#008fba" },
    secondary: { main: "#7adb30" },
    error: { main: "#f44336" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter regular", sans-serif',
        },
      },
    },
  },
});

export default theme;
