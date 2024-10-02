import { type FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ToothBox: FC<{
  children: ReactNode | ReactNode[];
  toothNumber: number;
  orientation: "top" | "bottom";
}> = ({ children, toothNumber, orientation }) => {
  return (
    <Box className={"tooth-box " + orientation}>
      {orientation === "bottom" && (
        <Box>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {toothNumber}
          </Typography>{" "}
        </Box>
      )}
      {children}

      {orientation === "top" && (
        <Box>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {toothNumber}
          </Typography>{" "}
        </Box>
      )}
    </Box>
  );
};
