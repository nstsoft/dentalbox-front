import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const ErrorTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));
