import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import TextField from "@mui/material/TextField";

type Props = {
  value: ToothPropertiesType["mobility"];
  onChange: (value: ToothPropertiesType["mobility"]) => void;
};

const Selects = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const Mobility: FC<Props> = ({ value, onChange }) => {
  return (
    <Box className="mobility">
      <TextField
        select
        defaultValue={value}
        slotProps={{ select: { native: true } }}
        variant="standard"
        onChange={(e) => onChange(+e.target.value)}
      >
        {Selects.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </Box>
  );
};
