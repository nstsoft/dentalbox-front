import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";

export const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  gap: theme.spacing(2),
  margin: "auto",
  padding: "20px",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "550px",
    padding: "10px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "20px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));