import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import TextField from "@mui/material/TextField";

type Props = {
  value: ToothPropertiesType["mobility"];
  onChange: (value: ToothPropertiesType["mobility"]) => void;
};

export const Mobility: FC<Props> = ({ value, onChange }) => {
  return (
    <Box className="mobility box-item">
      <TextField
        type="number"
        value={value}
        variant="standard"
        onChange={({ target }) => {
          const value = +target.value;
          if (value >= 0 && value <= 3) onChange(+target.value);
        }}
      />
    </Box>
  );
};
