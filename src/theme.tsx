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
  },
});

export default theme;
