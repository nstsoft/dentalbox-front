import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import TextField from "@mui/material/TextField";
import { isNumber } from "../utils";

type Props = {
  value: ToothPropertiesType["mobility"];
  onChange: (value: ToothPropertiesType["mobility"]) => void;
};

export const Mobility: FC<Props> = ({ value, onChange }) => {
  return (
    <Box className="mobility box-item">
      <TextField
        value={value}
        variant="standard"
        onChange={({ target }) => {
          if (!isNumber(target.value)) return;
          const targetValue = target.value.startsWith("0")
            ? target.value.slice(1)
            : target.value;

          onChange(+targetValue);
        }}
      />
    </Box>
  );
};
