import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import { IconButton } from "@elements";
import { type FC, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomModal } from "@elements";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export type ColorPickerProps = {
  color: { color: string; name: string; id: string };
  onChange: (newColor: { color: string; name: string }) => void;
  onDelete: (id: string) => void;
};

export const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onChange,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.dentalMap",
  });

  return (
    <>
      <CustomModal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box>
          <Box>
            <Typography variant="h6" textAlign="center" m={2}>
              Confirm remove?
            </Typography>
          </Box>
          <Box>
            <Button onClick={() => setIsOpen(false)}>
              {t("delete", { keyPrefix: "buttons" })}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onDelete(deleteId);
                setIsOpen(false);
              }}
            >
              {t("submit", { keyPrefix: "buttons" })}
            </Button>
          </Box>
        </Box>
      </CustomModal>
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
      <IconButton
        onClick={() => {
          setDeleteId(color.id);
          setIsOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};
