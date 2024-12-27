import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["bleeding"];
  onChange: (value: ToothPropertiesType["bleeding"]) => void;
};

export const Bleeding: FC<Props> = ({ value }) => {
  return <Box className="bleeding">{value}</Box>;
};
