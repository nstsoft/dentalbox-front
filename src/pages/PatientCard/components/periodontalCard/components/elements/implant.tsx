import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
type Props = {
  value: [boolean];
  onChange: (value: ToothPropertiesType["implant"]) => void;
};

export const Implant: FC<Props> = ({ value, onChange }) => {
  return (
    <Box onClick={() => onChange(!value[0])} className="implant box-item">
      {value[0] ? (
        <DangerousIcon className="icon" />
      ) : (
        <DoneOutlineIcon className="icon" />
      )}
    </Box>
  );
};
