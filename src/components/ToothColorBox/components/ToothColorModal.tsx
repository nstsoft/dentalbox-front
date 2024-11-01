import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomModal } from "@elements";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newColor: { name: string; color: string }) => void;
};

export const ToothColorModal: FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [color, setColor] = useState({ name: "", color: "#000000" });
  const { t } = useTranslation("", {
    keyPrefix: "components.toothMapLegend",
  });

  return (
    <CustomModal open={isOpen} onClose={onClose}>
      <Box className="add-tooth-color-modal">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel>{t("toothColor")}</FormLabel>
          <Input
            type="color"
            required
            value={color.color}
            onChange={(e) =>
              setColor((prev) => ({ ...prev, color: e.target.value }))
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor={color.name}>{t("itemName")}</InputLabel>
          <OutlinedInput
            id={color.name}
            type="text"
            required
            onChange={(e) =>
              setColor((prev) => ({ ...prev, name: e.target.value }))
            }
            value={color.name}
            color="primary"
            name={color.name}
            label={t("itemName")}
            sx={{ ariaLabel: color.name }}
          />
        </FormControl>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => {
              onCreate(color);
            }}
            variant="contained"
            type="submit"
          >
            {t("create", { keyPrefix: "buttons" })}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
