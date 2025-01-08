import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import { FurcationElement } from "./furcationElement";

const positions = ["left", "right"];

type Props = {
  value: ToothPropertiesType["furcation"];
  onChange: (value: ToothPropertiesType["furcation"]) => void;
  implant: boolean;
  available: boolean;
};

export const Furcation: FC<Props> = ({
  value,
  onChange,
  implant,
  available,
}) => {
  if (!available || implant) {
    return <Box className="multiple-furcations"></Box>;
  }
  return (
    <Box className="multiple-furcations">
      {value.map((item, index) => (
        <FurcationElement
          key={positions[index] + item}
          value={item}
          onChange={(val) => {
            const newValue = [...value];
            newValue[index] = val;
            onChange(newValue as [number] | [number, number]);
          }}
        />
      ))}
    </Box>
  );
};
