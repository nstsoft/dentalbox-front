import { type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";
import { Input } from "@mui/material";

type Props = {
  value: ToothPropertiesType["note"];
  onChange: (value: ToothPropertiesType["note"]) => void;
};

export const Note: FC<Props> = ({ value, onChange }) => {
  return (
    <Box className="note box-item">
      <Input value={value} onChange={({ target }) => onChange(target.value)} />
    </Box>
  );
};
