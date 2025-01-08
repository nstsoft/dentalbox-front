import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import { isNumber } from "../utils";
import Input from "@mui/material/Input";

type Props = {
  toothKey: string;
  value: ToothPropertiesType["depth"];
  onChange: (value: ToothPropertiesType["depth"]) => void;
};

export const Depth: FC<Props> = ({ value, onChange, toothKey }) => {
  const keys = ["left", "center", "right"];
  return (
    <Box className="depth box-item">
      {value.map((item, index) => (
        <Input
          className="field"
          key={`${toothKey}_margin` + keys[index]}
          value={item}
          onChange={({ target }) => {
            if (!isNumber(target.value)) {
              return;
            }
            const newValue = [...value];
            newValue[index] = target.value ? +target.value : 0;
            onChange(newValue as ToothPropertiesType["margin"]);
          }}
        />
      ))}
    </Box>
  );
};
