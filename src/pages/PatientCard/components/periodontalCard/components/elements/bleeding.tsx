import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["bleeding"];
  onChange: (value: ToothPropertiesType["bleeding"]) => void;
};

export const Bleeding: FC<Props> = ({ value, onChange }) => {
  return (
    <Box className="bleeding box-item">
      {value.map((item, index) => (
        <Box
          className="field"
          key={"bleeding" + index + item}
          onClick={() => {
            const newValue = [...value];
            newValue[index] = !newValue[index];
            onChange(newValue as ToothPropertiesType["bleeding"]);
          }}
          sx={{
            backgroundColor: value ? "#ff6565" : "#e9e9e9",
          }}
        />
      ))}
    </Box>
  );
};
