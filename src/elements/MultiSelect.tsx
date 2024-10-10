import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 270,
    },
  },
};

type Props = {
  data: { value: string; label: string }[];
  selected: string[];
  setValue: (value: string[]) => void;
  label: string;
  renderValue?: (selected: string) => string;
  sx?: SxProps<Theme>;
};

export const CustomMultiSelect: FC<Props> = ({
  data,
  setValue,
  selected,
  label,
  sx,
}) => {
  return (
    <FormControl
      sx={{ ...sx, m: 0, mt: 1, mb: 1, p: 0, width: sx ? "100%" : 300 }}
    >
      <InputLabel sx={{ mt: "-7px" }} id="checkbox-label">
        {label}
      </InputLabel>
      <Select
        labelId="checkbox-label"
        multiple
        value={selected}
        onChange={({ target }) => {
          setValue(
            typeof target.value === "string"
              ? target.value.split(",")
              : target.value
          );
        }}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          data
            .filter((item) => selected.includes(item.value))
            .map((item) => item.label)
            .join(", ")
        }
        sx={{ p: 0, height: "35px" }}
        MenuProps={MenuProps}
      >
        {data.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={!!selected.includes(item.value)} />
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
