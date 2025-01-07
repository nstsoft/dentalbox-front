import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import TextField from "@mui/material/TextField";
import { isNumber } from "../utils";

type Props = {
  toothKey: string;
  value: ToothPropertiesType["margin"];
  onChange: (value: ToothPropertiesType["margin"]) => void;
};

export const Margin: FC<Props> = ({ value, onChange, toothKey }) => {
  const keys = ["left", "center", "right"];
  return (
    <Box className="">
      {value.map((item, index) => (
        <></>
        // <TextField
        //   className="field"
        //   key={`${toothKey}_margin` + keys[index]}
        //   value={item}
        //   type="number"
        //   variant="standard"
        //   onChange={({ target }) => {
        //     if (!isNumber(target.value)) {
        //       return;
        //     }
        //     const newValue = [...value];
        //     newValue[index] = +target.value;
        //     onChange(newValue as ToothPropertiesType["margin"]);
        //   }}
        // />
      ))}
    </Box>
  );
};
