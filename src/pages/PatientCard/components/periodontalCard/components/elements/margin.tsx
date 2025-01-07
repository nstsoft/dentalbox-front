import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import { TextField } from "@mui/material";
import { isNumber } from "../utils";

type Props = {
  value: ToothPropertiesType["margin"];
  onChange: (value: ToothPropertiesType["margin"]) => void;
};

export const Margin: FC<Props> = ({ value, onChange }) => {
  return (
    <Box className="margin box-item">
      {value.map((item, index) => (
        <TextField
          className="field"
          key={"margin" + index + item}
          value={item}
          variant="standard"
          onChange={({ target }) => {
            if (!isNumber(target.value)) {
              return;
            }
            const newValue = [...value];
            newValue[index] = +target.value;
            onChange(newValue as ToothPropertiesType["margin"]);
          }}
        />
      ))}
    </Box>
  );
};
