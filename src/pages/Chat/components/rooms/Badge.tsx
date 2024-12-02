import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== "isOnline",
})<{ isOnline: boolean }>(({ theme, isOnline }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: isOnline ? "#44b700" : "darkgray",
    color: isOnline ? "#44b700" : "darkgray",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));
