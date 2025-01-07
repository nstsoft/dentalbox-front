import { useEffect, type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["furcation"];
  onChange: (value: ToothPropertiesType["furcation"]) => void;
  isImplant: boolean;
  isAvailable: boolean;
};

export const Furcation: FC<Props> = ({
  value,
  onChange,
  isImplant,
  isAvailable,
}) => {
  useEffect(() => {
    if (isImplant) onChange(0);
  }, [isImplant, onChange]);

  return (
    <Box
      onClick={() => {
        if (!isImplant && isAvailable) {
          onChange(value < 3 ? value + 1 : 0);
        }
      }}
      className="furcation box-item"
      sx={{
        backgroundColor: !isAvailable ? "#ffffff" : "#e9e9e9",
      }}
    >
      <Box
        className="furcation-icon"
        sx={{
          border: value ? "1px solid black" : "none",
        }}
      >
        <Box
          className="round left"
          sx={{
            backgroundColor: value >= 2 ? "black" : "transparent",
          }}
        />
        <Box
          className="round right"
          sx={{
            backgroundColor: value === 3 ? "black" : "transparent",
          }}
        />
      </Box>
    </Box>
  );
};
