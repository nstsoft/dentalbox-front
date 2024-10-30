import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newColor: { name: string; color: string }) => void;
};

export const ToothColorModal: FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [color, setColor] = useState({ name: "", color: "#000000" });
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.dentalMap",
  });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          onCreate(color);
        }}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          overflow: "auto",
          boxShadow: 24,
          borderRadius: "8px",
          p: 4,
        }}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel>{t("toothColor")}</FormLabel>
          <Input
            type="color"
            required
            value={color.color}
            onChange={(e) =>
              setColor((prev) => ({ ...prev, color: e.target.value }))
            }
            sx={{ mt: 0 }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor={color.name}>{t("toothColorName")}</InputLabel>
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
            label={t("toothColorName")}
            sx={{ ariaLabel: color.name }}
          />
        </FormControl>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" type="submit">
            {t("create", { keyPrefix: "buttons" })}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
