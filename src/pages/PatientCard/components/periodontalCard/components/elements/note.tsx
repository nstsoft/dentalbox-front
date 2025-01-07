import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

type Props = {
  value: ToothPropertiesType["note"];
  onChange: (value: ToothPropertiesType["note"]) => void;
};

export const Note: FC<Props> = ({ value }) => {
  return <Box className="note box-item">{value}-</Box>;
};
