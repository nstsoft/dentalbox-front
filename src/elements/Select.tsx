import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";

type Props = {
  data: { value: string; label: string }[];
  selected: string;
  setValue: (value: string) => void;
  label: string;
  renderValue?: (selected: string) => string;
};

export const CustomSelect: FC<Props> = ({
  data,
  setValue,
  selected,
  label,
}) => {
  return (
    <FormControl sx={{ m: 0, mt: 1, mb: 1, p: 0, width: 300 }}>
      <InputLabel sx={{ mt: "-7px" }} id="checkbox-label">
        {label}
      </InputLabel>
      <Select
        labelId="checkbox-label"
        value={selected}
        onChange={({ target }) => setValue(target.value)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          data
            .filter((item) => selected.includes(item.value))
            .map((item) => item.label)
            .join(", ")
        }
        sx={{ p: 0, height: "40px" }}
      >
        {data.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
