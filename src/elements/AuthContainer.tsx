import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export const AuthContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  background: "#f0f9ff",
  ...theme.applyStyles("dark", {
    background: "#1a202c",
  }),
}));
