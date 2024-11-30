import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { SxProps, Theme } from "@mui/material/styles";

type Props = {
  onEnter: (tooth: string) => void;
  onDelete: (tooth: string) => void;
  value: string[];
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

export const ChipInput: FC<Props> = ({
  value,
  onEnter,
  onDelete,
  fullWidth,
  sx,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard.history" });
  const [toothText, setToothText] = useState("");
  const validator = /^[1-9]+$/;

  return (
    <FormControl sx={{ mb: 2, ...sx }} fullWidth={fullWidth}>
      <OutlinedInput
        id="teeth"
        type="text"
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !value.includes(toothText) &&
            validator.test(toothText)
          ) {
            onEnter(toothText);
            setToothText("");
          }
        }}
        onChange={({ target }) => {
          setToothText(target.value);
        }}
        value={toothText}
        color="primary"
        name="teeth"
        sx={{ ariaLabel: "teeth", pl: 1 }}
        placeholder={t("teeth")}
        startAdornment={
          <InputAdornment position="start">
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {value.map((tooth, index) => (
                <Chip
                  key={tooth + index}
                  label={tooth}
                  onDelete={() => onDelete(tooth)}
                  size="small"
                  color="primary"
                />
              ))}
            </Box>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
