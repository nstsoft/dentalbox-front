import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["margin"];
  onChange: (value: ToothPropertiesType["margin"]) => void;
};

export const Margin: FC<Props> = ({ value }) => {
  return <Box className="margin">{value}</Box>;
};
