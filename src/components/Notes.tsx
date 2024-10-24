import { Card, Textarea } from "@elements";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useState } from "react";
import { FormControl, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type NotesProps = {
  label: string;
  value?: string;
  setValue: (value: string) => void;
  onConfirm: () => void;
};

export const Notes: FC<NotesProps> = ({
  label,
  value,
  setValue,
  onConfirm,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [isEdit, setIsEdit] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  return (
    <Card sx={{ m: 0, position: "relative", gap: 0, alignSelf: "flex-start" }}>
      <Button
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={() => setIsEdit((prev) => !prev)}
      >
        {isEdit ? <CloseIcon /> : <EditIcon />}
      </Button>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <FormControl sx={{ width: "100%" }}>
        {isEdit ? (
          <Textarea
            id="patientNotes"
            value={value}
            onChange={({ target }) => {
              if (target.value !== value) {
                setIsDataChanged(true);
              }
              setValue(target.value);
            }}
          />
        ) : (
          <Typography>{value ?? ""}</Typography>
        )}
      </FormControl>

      <Button
        type="submit"
        variant={"contained"}
        disabled={!isDataChanged}
        sx={{ mt: 2 }}
        onClick={() => {
          setIsEdit(false);
          onConfirm();
        }}
      >
        {t("save", { keyPrefix: "buttons" })}
      </Button>
    </Card>
  );
};
