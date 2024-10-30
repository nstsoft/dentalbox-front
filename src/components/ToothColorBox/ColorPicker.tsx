import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { type FC } from "react";

export type ColorPickerProps = {
  color: {
    color: string;
    name: string;
  };
  onChange: (newColor: { color: string; name: string }) => void;
};

export const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => (
  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
    <Input
      value={color.name}
      onChange={(e) => onChange({ ...color, name: e.target.value })}
    />
    <Input
      type="color"
      value={color.color}
      sx={{ width: "20px", height: "20px" }}
      onChange={(e) => onChange({ ...color, color: e.target.value })}
    />
  </Box>
);
