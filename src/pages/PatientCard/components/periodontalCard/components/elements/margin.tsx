import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

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
          type="number"
          className="field"
          key={`${toothKey}_margin_` + index}
          value={`${item}`}
          onChange={({ target }) => {
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
