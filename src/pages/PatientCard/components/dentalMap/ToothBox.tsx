import { type FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ToothBox: FC<{
  children: ReactNode | ReactNode[];
  toothNumber: number;
}> = ({ children, toothNumber }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {toothNumber}
      </Typography>
      {children}
    </Box>
  );
};
