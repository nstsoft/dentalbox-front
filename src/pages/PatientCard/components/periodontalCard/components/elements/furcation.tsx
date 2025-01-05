import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["furcation"];
  onChange: (value: ToothPropertiesType["furcation"]) => void;
};

export const Furcation: FC<Props> = ({ value, onChange }) => {
  return (
    <Box onClick={() => onChange(value + 1)} className="furcation">
      {value}
    </Box>
  );
};
