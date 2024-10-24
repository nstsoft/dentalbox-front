import { type FC, ReactNode, Fragment } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import type { Chart } from "@types";
import { Button } from "@mui/material";

export const ToothBox: FC<{
  children: ReactNode | ReactNode[];
  toothNumber: number;
  orientation: "top" | "bottom";
  isFocused: boolean;
  hasDescription: boolean;
  onToothObjectChange: (tooth: keyof Chart) => void;
  onToothSelect: (tooth: keyof Chart) => void;
}> = ({
  children,
  toothNumber,
  orientation,
  onToothObjectChange,
  onToothSelect,
  isFocused,
  hasDescription,
}) => {
  const elements = [
    <Box
      onClick={() => onToothSelect(("t" + toothNumber) as keyof Chart)}
      className={
        "tooth-number" +
        (isFocused ? " focused" : "") +
        (hasDescription ? " with-description" : "")
      }
      key={"number" + toothNumber}
    >
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {toothNumber}
      </Typography>
    </Box>,
    <Fragment key={"children" + toothNumber}>{children}</Fragment>,

    <Button
      key={"tooth-panel" + toothNumber}
      className="tooth-panel"
      variant="outlined"
      onClick={() => onToothObjectChange(("t" + toothNumber) as keyof Chart)}
    >
      <ChangeCircleIcon />
    </Button>,
  ];
  if (orientation === "top") {
    elements.reverse();
  }

  return <Box className={"tooth-box " + orientation}>{elements}</Box>;
};