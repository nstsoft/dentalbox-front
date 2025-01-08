import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import { isNumber } from "../utils";

type Props = {
  toothKey: string;
  value: ToothPropertiesType["margin"];
  onChange: (value: ToothPropertiesType["margin"]) => void;
};

export const Margin: FC<Props> = ({ value, onChange, toothKey }) => {
  return (
    <Box className="margin box-item">
      {value.map((item, index) => (
        <input
          className="field"
          key={`${toothKey}_margin_` + index}
          value={item}
          onChange={({ target }) => {
            if (!isNumber(target.value)) return;
            const targetValue = target.value.startsWith("0")
              ? target.value.slice(1)
              : target.value;

            const newValue = [...value];
            newValue[index] = +targetValue;
            onChange(newValue as ToothPropertiesType["margin"]);
          }}
        />
      ))}
    </Box>
  );
};
