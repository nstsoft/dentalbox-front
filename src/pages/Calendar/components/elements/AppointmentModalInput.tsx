import { ReactNode, type FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
  icon: ReactNode;
  label: string;
  isEditingMode: boolean;
  value?: string;
  initialValue?: string;
  items: { key: string; value: string }[];
  canEdit: boolean;
  searchable?: boolean;
  onChange: (value: string) => void;
};

export const AppointmentModalInput: FC<Props> = ({
  icon,
  label,
  isEditingMode,
  value,
  items,
  onChange,
  initialValue,
  canEdit,
  searchable,
}) => {
  if (items.length === 0) return null;

  const renderSelect = () => {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
          value={value}
          label={label}
        >
          {items.map((v) => (
            <MenuItem key={v.key + v.value} value={v.key}>
              {v.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const renderSearch = () => {
    return (
      <Autocomplete
        fullWidth
        disablePortal
        options={items.map((item) => ({ label: item.value, key: item.key }))}
        onChange={(_, value) => {
          if (value?.key) {
            onChange(value.key);
          }
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", p: 1 }}>
      <Typography>{icon}</Typography>
      {isEditingMode && items.length > 0 && canEdit ? (
        <Box sx={{ width: "100%" }}>
          {searchable && renderSearch()}
          {!searchable && renderSelect()}
        </Box>
      ) : (
        <Typography variant="body2">{initialValue}</Typography>
      )}
    </Box>
  );
};
