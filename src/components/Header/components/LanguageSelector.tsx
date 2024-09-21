import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useLocalStorage, LANGUAGE } from "@hooks";
import { useTranslation } from "react-i18next";

const CustomSelect = styled(Select)({
  ".MuiSelect-icon": { display: "none" },
});

export function LanguageSelector() {
  const [language, setLanguage] = useLocalStorage(LANGUAGE, "ua");
  const { i18n } = useTranslation("", { keyPrefix: "header" });

  const handleChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

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
      onChange={(event) => handleChange(event.target.value as string)}
      defaultValue={"en"}
      defaultChecked={true}
      variant="outlined"
    >
      <MenuItem selected value="en">
        En
      </MenuItem>
      <MenuItem value="ua">Укр</MenuItem>
    </CustomSelect>
    // </FormControl>
  );
}

export default LanguageSelector;
