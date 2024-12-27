import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["plaque"];
  onChange: (value: ToothPropertiesType["plaque"]) => void;
};

export const Plaque: FC<Props> = ({ value }) => {
  return <Box className="plaque">{value}</Box>;
};
