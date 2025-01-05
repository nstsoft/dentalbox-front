import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
type Props = {
  value: ToothPropertiesType["implant"];
  onChange: (value: ToothPropertiesType["implant"]) => void;
};

export const Implant: FC<Props> = ({ value, onChange }) => {
  return (
    <Box onClick={() => onChange(!value)} className="implant">
      {value ? <DangerousIcon /> : <DoneOutlineIcon />}
    </Box>
  );
};
