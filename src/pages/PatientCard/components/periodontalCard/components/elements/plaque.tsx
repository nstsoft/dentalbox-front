import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["plaque"];
  onChange: (value: ToothPropertiesType["plaque"]) => void;
};

export const Plaque: FC<Props> = ({ value, onChange }) => {
  return (
    <Box className="plaque box-item">
      {value.map((item, index) => (
        <Box
          className="field"
          key={"bleeding" + index + item}
          onClick={() => {
            const newValue = [...value];
            newValue[index] = !newValue[index];
            onChange(newValue as ToothPropertiesType["plaque"]);
          }}
          sx={{
            backgroundColor: item ? "#ff6565" : "#e9e9e9",
          }}
        />
      ))}
    </Box>
  );
};
