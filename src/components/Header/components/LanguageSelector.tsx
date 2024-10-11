import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useLanguage } from "@hooks";
import { LANGUAGES } from "@types";

const CustomSelect = styled(Select)({ ".MuiSelect-icon": { display: "none" } });

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <CustomSelect
      sx={{
        fieldSet: {
          outline: "none",
          border: "none",
          "&:hover": { border: "none" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
        },
        width: 80,
        color: "white",
        textAlign: "center",
      }}
      labelId="language-select-label"
      id="language-select"
      value={language}
      onChange={(event) => setLanguage(event.target.value as LANGUAGES)}
      defaultValue={"en"}
      defaultChecked={true}
      variant="outlined"
    >
      <MenuItem selected value="en">
        En
      </MenuItem>
      <MenuItem value="uk">Укр</MenuItem>
    </CustomSelect>
  );
}

export default LanguageSelector;
