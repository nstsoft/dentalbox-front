import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["depth"];
  onChange: (value: ToothPropertiesType["depth"]) => void;
};

export const Depth: FC<Props> = ({ value }) => {
  return <Box className="depth">{value}</Box>;
};
